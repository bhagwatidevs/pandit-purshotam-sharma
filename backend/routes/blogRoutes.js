const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const { protect, allowRoles } = require("../middleware/authMiddleware.js");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
} = require("../controllers/blogController.js");

// Blog endpoint only creates/updates blog articles. News is handled by /api/press-release.
router.get("/", getBlog);
router.post("/", protect, allowRoles("admin"), upload.single("image"), createBlog);
router.put("/:id", protect, allowRoles("admin"), upload.single("image"), updateBlog);
router.delete("/:id", protect, allowRoles("admin"), deleteBlog);

module.exports = router;
