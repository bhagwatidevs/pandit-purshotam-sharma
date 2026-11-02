const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const { protect, allowRoles } = require("../middleware/authMiddleware.js");
const {
  createPressRelease,
  updatePressRelease,
  deletePressRelease,
  getPressReleases,
} = require("../controllers/blogController.js");

// Dedicated endpoint: every POST/PUT here is saved as contentType "news".
router.get("/", getPressReleases);
router.post("/", protect, allowRoles("admin"), upload.single("image"), createPressRelease);
router.put("/:id", protect, allowRoles("admin"), upload.single("image"), updatePressRelease);
router.delete("/:id", protect, allowRoles("admin"), deletePressRelease);

module.exports = router;
