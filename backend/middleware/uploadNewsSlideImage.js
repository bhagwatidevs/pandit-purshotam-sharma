const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Hard limit for news slider images: 200 KB.
const MAX_IMAGE_BYTES = 200 * 1024;

const cloudinaryConfigured = Boolean(
  process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET
);

const storage = cloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "astrology/news-slides",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (_req, file) =>
          `slide-${Date.now()}-${file.originalname
            .split(".")[0]
            .replace(/[^a-zA-Z0-9_-]/g, "-")}`,
      },
    })
  : multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      const error = new Error("Only JPG, PNG or WEBP images can be uploaded.");
      error.status = 400;
      return callback(error);
    }
    return callback(null, true);
  },
});

module.exports = {
  MAX_IMAGE_BYTES,
  single(fieldName) {
    const parseMultipart = multerUpload.single(fieldName);

    return (req, res, next) => {
      // JSON requests (image URL, edits without a new image) skip uploading.
      if (!req.is("multipart/form-data")) return next();

      return parseMultipart(req, res, (error) => {
        if (error) {
          if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
              message: `Image is too large. Maximum allowed size is ${MAX_IMAGE_BYTES / 1024} KB.`,
            });
          }
          if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Unexpected file field." });
          }
          return res
            .status(error.status || 500)
            .json({ message: error.message || "Image upload failed." });
        }

        if (!cloudinaryConfigured && req.file) {
          return res.status(503).json({
            message:
              "Image uploads are not configured. Add CLOUD_NAME, API_KEY and API_SECRET to backend/.env.",
          });
        }

        return next();
      });
    };
  },
};
