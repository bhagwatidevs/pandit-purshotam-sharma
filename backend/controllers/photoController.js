const Photo = require("../models/Photo");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

exports.createPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "Photo file is required" });
    const photo = await Photo.create({ imageUrl: req.file.path, imagePublicId: req.file.filename });
    return res.status(201).json({ photo, msg: "Photo created successfully" });
  } catch (err) {
    console.error("Create photo error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};

exports.getPhoto = async (_req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    return res.json(photos);
  } catch (err) {
    console.error("Error in getPhoto:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid photo ID" });
    if (!req.file) return res.status(400).json({ msg: "Choose a replacement image to edit this photo" });

    const photo = await Photo.findById(id);
    if (!photo) return res.status(404).json({ msg: "Photo not found" });

    const oldPublicId = photo.imagePublicId;
    photo.imageUrl = req.file.path;
    photo.imagePublicId = req.file.filename;
    await photo.save();

    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, { resource_type: "image" });
      } catch (error) {
        console.error("Cloudinary image cleanup failed:", error.message || error);
      }
    }

    return res.json({ success: true, photo, msg: "Photo updated successfully" });
  } catch (err) {
    console.error("Update photo error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid photo ID" });
    const photo = await Photo.findById(id);
    if (!photo) return res.status(404).json({ msg: "Photo not found" });

    if (photo.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(photo.imagePublicId, { resource_type: "image" });
      } catch (error) {
        console.error("Cloudinary delete error:", error.message || error);
      }
    }
    await Photo.findByIdAndDelete(id);
    return res.json({ success: true, msg: "Photo deleted successfully" });
  } catch (err) {
    console.error("Delete photo error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};
