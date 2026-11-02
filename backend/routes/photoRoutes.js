const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTeamImage.js");
const { protect, allowRoles } = require("../middleware/authMiddleware.js");
const { createPhoto, getPhoto, updatePhoto, deletePhoto } = require("../controllers/photoController.js");

router.get("/", getPhoto);
router.post("/", protect, allowRoles("admin"), upload.single("image"), createPhoto);
router.put("/:id", protect, allowRoles("admin"), upload.single("image"), updatePhoto);
router.delete("/:id", protect, allowRoles("admin"), deletePhoto);

module.exports = router;
