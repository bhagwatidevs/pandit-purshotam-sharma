const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    // "article" is the default so existing blog-publishing forms remain compatible.
    contentType: {
      type: String,
      enum: ["article", "news"],
      default: "article",
      index: true,
    },
    category: { type: String, trim: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogSchema);
