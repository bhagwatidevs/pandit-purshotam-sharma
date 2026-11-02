const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const NEWS_CATEGORY_REGEX = /(^|[\s_-])(news|press)([\s_-]|$)/i;

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary image delete error:", error.message || error);
  }
};

const newsFilter = () => ({
  $or: [
    { contentType: "news" },
    // Recover records created before contentType was reliably saved.
    // Also recovers old mislabelled records whose category clearly says press/news.
    { category: NEWS_CATEGORY_REGEX },
  ],
});

const articleFilter = () => ({
  $and: [
    {
      $or: [
        { contentType: { $in: ["article", "blog"] } },
        { contentType: { $exists: false } },
        { contentType: null },
        { contentType: "" },
      ],
    },
    { category: { $not: NEWS_CATEGORY_REGEX } },
  ],
});



const createContent = async (req, res, forcedType) => {
  try {
    const { name, title, description, category } = req.body;

    if (!String(name || "").trim()) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!String(title || "").trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!String(description || "").trim()) {
      return res.status(400).json({ message: "Description is required" });
    }

    // The route chooses the type. Do not trust a client-side contentType value.
    const record = await Blog.create({
      name: String(name).trim(),
      title: String(title).trim(),
      contentType: forcedType,
      category: String(category || "").trim(),
      description: String(description).trim(),
      imageUrl: req.file?.path,
      imagePublicId: req.file?.filename,
    });

    return res.status(201).json({
      success: true,
      [forcedType === "news" ? "pressRelease" : "blog"]: record,
      msg: forcedType === "news" ? "Press release created successfully" : "Blog article created successfully",
    });
  } catch (error) {
    console.error(`Create ${forcedType} content error:`, error);
    return res.status(500).json({ message: "Server error", details: error.message });
  }
};

const listContent = async (res, contentType) => {
  try {
    const filter = contentType === "news" ? newsFilter() : articleFilter();
    const records = await Blog.find(filter).sort({ createdAt: -1 });

    // Normalize category-matched legacy records for the client as well.
    const output = records.map((record) => {
      const plain = record.toObject();
      if (contentType === "news") plain.contentType = "news";
      return plain;
    });

    return res.json(output);
  } catch (error) {
    console.error(`Get ${contentType} content error:`, error);
    return res.status(500).json({ message: "Server error", details: error.message });
  }
};

exports.createBlog = (req, res) => createContent(req, res, "article");
exports.createPressRelease = (req, res) => createContent(req, res, "news");

exports.getBlog = async (req, res) => {
  const requestedType = String(req.query.type || req.query.contentType || "article")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  if (["all", "any"].includes(requestedType)) {
    try {
      const records = await Blog.find({}).sort({ createdAt: -1 });
      return res.json(records);
    } catch (error) {
      console.error("Get all content error:", error);
      return res.status(500).json({ message: "Server error", details: error.message });
    }
  }

  if (["news", "press", "press-release", "news-release"].includes(requestedType)) {
    return listContent(res, "news");
  }

  return listContent(res, "article");
};

exports.getPressReleases = (_req, res) => listContent(res, "news");

const updateContent = async (req, res, forcedType) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }

    const record = await Blog.findById(id);
    if (!record) return res.status(404).json({ message: "Content not found" });

    const { name, title, description, category } = req.body;
    if (name !== undefined) {
      if (!String(name).trim()) return res.status(400).json({ message: "Name is required" });
      record.name = String(name).trim();
    }
    if (title !== undefined) {
      if (!String(title).trim()) return res.status(400).json({ message: "Title is required" });
      record.title = String(title).trim();
    }
    if (description !== undefined) {
      if (!String(description).trim()) return res.status(400).json({ message: "Description is required" });
      record.description = String(description).trim();
    }
    if (category !== undefined) record.category = String(category || "").trim();

    // The endpoint owns the content type, including when an old record is edited.
    record.contentType = forcedType;

    if (req.file) {
      const previousImagePublicId = record.imagePublicId;
      record.imageUrl = req.file.path;
      record.imagePublicId = req.file.filename;
      if (previousImagePublicId) await deleteCloudinaryImage(previousImagePublicId);
    }

    await record.save();
    return res.json({
      success: true,
      [forcedType === "news" ? "pressRelease" : "blog"]: record,
      msg: forcedType === "news" ? "Press release updated successfully" : "Blog article updated successfully",
    });
  } catch (error) {
    console.error(`Update ${forcedType} content error:`, error);
    return res.status(500).json({ message: "Server error", details: error.message });
  }
};

exports.updateBlog = (req, res) => updateContent(req, res, "article");
exports.updatePressRelease = (req, res) => updateContent(req, res, "news");

const deleteContentByType = async (req, res, contentType) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }

    const filter = contentType === "news" ? newsFilter() : articleFilter();
    const record = await Blog.findOne({ $and: [{ _id: id }, filter] });
    if (!record) {
      return res.status(404).json({
        message: contentType === "news" ? "Press release not found" : "Blog article not found",
      });
    }

    await deleteCloudinaryImage(record.imagePublicId);
    await Blog.findByIdAndDelete(id);
    return res.json({
      success: true,
      msg: contentType === "news" ? "Press release deleted successfully" : "Blog article deleted successfully",
    });
  } catch (error) {
    console.error(`Delete ${contentType} content error:`, error);
    return res.status(500).json({ message: "Server error", details: error.message });
  }
};

exports.deleteBlog = (req, res) => deleteContentByType(req, res, "article");
exports.deletePressRelease = (req, res) => deleteContentByType(req, res, "news");
