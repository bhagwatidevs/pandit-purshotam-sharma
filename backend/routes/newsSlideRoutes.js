const express = require("express");
const mongoose = require("mongoose");
const NewsSlide = require("../models/NewsSlide");
const cloudinary = require("../utils/cloudinary");
const uploadNewsSlideImage = require("../middleware/uploadNewsSlideImage");

/**
 * Mount this router at /api/news-slides.
 * Pass your project's existing admin-authentication middleware as requireAdmin.
 * Do not leave requireAdmin unconfigured: the admin write endpoints must be protected.
 * 
 * Admin create/update accept either:
 *  - JSON with an imageUrl, or
 *  - multipart/form-data with an "image" file (max 200 KB, JPG/PNG/WEBP).
 */
module.exports = function createNewsSlideRoutes({ requireAdmin } = {}) {
  if (typeof requireAdmin !== "function") {
    throw new Error(
      "createNewsSlideRoutes requires your existing requireAdmin middleware."
    );
  }
  
  const router = express.Router();

  // multipart form values arrive as strings.
  const parseBoolean = (value, fallback) => {
    if (typeof value === "boolean") return value;
    if (value === "true") return true;
    if (value === "false") return false;
    return fallback;
  };

  const removeCloudinaryImage = async (publicId) => {
    if (!publicId) return;
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    } catch (error) {
      console.error("Cloudinary news slide cleanup failed:", error.message || error);
    }
  };

  // Public: only active slides appear on the website.
  router.get("/", async (req, res) => {
    try {
      const slides = await NewsSlide.find({ isActive: true })
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean();

      return res.json({ slides });
    } catch (error) {
      console.error("Fetch public news slides error:", error);
      return res.status(500).json({ message: "Could not load slider items." });
    }
  });

  // Admin: list all slides, including hidden ones.
  router.get("/admin", requireAdmin, async (req, res) => {
    try {
      const slides = await NewsSlide.find()
        .sort({ sortOrder: 1, createdAt: -1 })
        .lean();

      return res.json({ slides });
    } catch (error) {
      console.error("Fetch admin news slides error:", error);
      return res.status(500).json({ message: "Could not load slider items." });
    }
  });

  // Admin: create a slide (image URL or uploaded file).
  router.post(
    "/admin",
    requireAdmin,
    uploadNewsSlideImage.single("image"),
    async (req, res) => {
      try {
        const { title, category, description, alt, sortOrder, isActive } =
          req.body || {};
        const imageUrl = req.file ? req.file.path : req.body?.imageUrl;
        const imagePublicId = req.file ? req.file.filename : "";

        if (!String(title || "").trim() || !String(imageUrl || "").trim()) {
          if (req.file) await removeCloudinaryImage(imagePublicId);
          return res.status(400).json({
            message: "Title and an image (URL or uploaded file) are required.",
          });
        }

        const slide = await NewsSlide.create({
          title,
          category,
          description,
          imageUrl,
          imagePublicId,
          alt: alt || title,
          sortOrder: Number(sortOrder) || 0,
          isActive: parseBoolean(isActive, true),
        });

        return res.status(201).json({
          message: "Slider item created successfully.",
          slide,
        });
      } catch (error) {
        console.error("Create news slide error:", error);
        if (req.file) await removeCloudinaryImage(req.file.filename);
        return res.status(500).json({ message: "Could not create slider item." });
      }
    }
  );

  // Admin: update a slide.
  router.put(
    "/admin/:id",
    requireAdmin,
    uploadNewsSlideImage.single("image"),
    async (req, res) => {
      try {
        if (!mongoose.isValidObjectId(req.params.id)) {
          if (req.file) await removeCloudinaryImage(req.file.filename);
          return res.status(400).json({ message: "Invalid slider item ID." });
        }

        const slide = await NewsSlide.findById(req.params.id);
        if (!slide) {
          if (req.file) await removeCloudinaryImage(req.file.filename);
          return res.status(404).json({ message: "Slider item not found." });
        }

        const body = req.body || {};
        const has = (field) => Object.prototype.hasOwnProperty.call(body, field);

        if (has("title") && !String(body.title).trim()) {
          if (req.file) await removeCloudinaryImage(req.file.filename);
          return res.status(400).json({ message: "Title cannot be empty." });
        }
        if (!req.file && has("imageUrl") && !String(body.imageUrl).trim()) {
          return res.status(400).json({ message: "Image cannot be empty." });
        }

        let oldPublicIdToRemove = "";

        for (const field of ["title", "category", "description", "alt"]) {
          if (has(field)) slide[field] = body[field];
        }
        if (has("sortOrder")) slide.sortOrder = Number(body.sortOrder) || 0;
        if (has("isActive")) {
          slide.isActive = parseBoolean(body.isActive, slide.isActive);
        }

        if (req.file) {
          // New uploaded file replaces the previous image.
          oldPublicIdToRemove = slide.imagePublicId;
          slide.imageUrl = req.file.path;
          slide.imagePublicId = req.file.filename;
        } else if (has("imageUrl") && body.imageUrl.trim() !== slide.imageUrl) {
          // Switched to a different external URL.
          oldPublicIdToRemove = slide.imagePublicId;
          slide.imageUrl = body.imageUrl.trim();
          slide.imagePublicId = "";
        }

        await slide.save();
        await removeCloudinaryImage(oldPublicIdToRemove);

        return res.json({ message: "Slider item updated successfully.", slide });
      } catch (error) {
        console.error("Update news slide error:", error);
        if (req.file) await removeCloudinaryImage(req.file.filename);
        return res.status(500).json({ message: "Could not update slider item." });
      }
    }
  );

  // Admin: delete a slide.
  router.delete("/admin/:id", requireAdmin, async (req, res) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid slider item ID." });
      }

      const slide = await NewsSlide.findByIdAndDelete(req.params.id);
      if (!slide) {
        return res.status(404).json({ message: "Slider item not found." });
      }

      await removeCloudinaryImage(slide.imagePublicId);

      return res.json({ message: "Slider item deleted successfully." });
    } catch (error) {
      console.error("Delete news slide error:", error);
      return res.status(500).json({ message: "Could not delete slider item." });
    }
  });

  return router;
};
