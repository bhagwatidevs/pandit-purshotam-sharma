const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary image delete error:", error.message || error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, role, price, oldprice } = req.body;
    if (!String(name || "").trim()) return res.status(400).json({ msg: "Name is required" });
    if (!String(role || "").trim()) return res.status(400).json({ msg: "Product description is required" });
    if (price === undefined || price === "" || !Number.isFinite(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ msg: "A valid product price is required" });
    }
    if (!req.file) return res.status(400).json({ msg: "Product image is required" });

    const product = await Product.create({
      name: String(name).trim(),
      role: String(role).trim(),
      price: Number(price),
      oldprice: oldprice === undefined || oldprice === "" ? null : Number(oldprice),
      imageUrl: req.file.path,
      imagePublicId: req.file.filename,
    });

    return res.status(201).json({ product, msg: "Product created successfully" });
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};

exports.getProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    console.error("Error in getProducts:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid product ID" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const { name, role, price, oldprice } = req.body;
    if (name !== undefined) {
      if (!String(name).trim()) return res.status(400).json({ msg: "Name is required" });
      product.name = String(name).trim();
    }
    if (role !== undefined) {
      if (!String(role).trim()) return res.status(400).json({ msg: "Product description is required" });
      product.role = String(role).trim();
    }
    if (price !== undefined) {
      if (price === "" || !Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({ msg: "A valid product price is required" });
      }
      product.price = Number(price);
    }
    if (oldprice !== undefined) {
      product.oldprice = oldprice === "" || oldprice === null ? null : Number(oldprice);
    }
    if (req.file) {
      const oldPublicId = product.imagePublicId;
      product.imageUrl = req.file.path;
      product.imagePublicId = req.file.filename;
      if (oldPublicId) await deleteCloudinaryImage(oldPublicId);
    }

    await product.save();
    return res.json({ success: true, product, msg: "Product updated successfully" });
  } catch (err) {
    console.error("Update product error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid product ID" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    await deleteCloudinaryImage(product.imagePublicId);
    await Product.findByIdAndDelete(id);
    return res.json({ success: true, msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ msg: "Server error", details: err.message });
  }
};
