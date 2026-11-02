const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const { protect, allowRoles } = require("../middleware/authMiddleware.js");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController.js");

router.get("/", getProducts);
router.post("/", protect, allowRoles("admin"), upload.single("image"), createProduct);
router.put("/:id", protect, allowRoles("admin"), upload.single("image"), updateProduct);
router.delete("/:id", protect, allowRoles("admin"), deleteProduct);

module.exports = router;
