const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const cloudinaryConfigured = Boolean(
  process.env.CLOUD_NAME && process.env.API_KEY && process.env.API_SECRET
);

const storage = cloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "astrology/photos",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: (req, file) =>
          `photo-${Date.now()}-${file.originalname.split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "-")}`,
        quality: "auto",
        fetch_format: "auto",
      },
    })
  : multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files can be uploaded."));
    }
    callback(null, true);
  },
});

module.exports = {
  single(fieldName) {
    const parseMultipart = multerUpload.single(fieldName);
    return (req, res, next) => {
      // Updates without a new image may use application/json and should not
      // require Cloudinary credentials. Only actual image uploads need it.
      if (!req.is("multipart/form-data")) return next();

      return parseMultipart(req, res, (error) => {
        if (error) return next(error);
        if (!cloudinaryConfigured && req.file) {
          return res.status(503).json({
            msg: "Image uploads are not configured. Add CLOUD_NAME, API_KEY and API_SECRET to backend/.env.",
          });
        }
        return next();
      });
    };
  },
};
