const express = require("express");
const router = express.Router();
const { submitContactForm, getAllContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/", submitContactForm);
router.get("/", protect, allowRoles("admin"), getAllContacts);
router.put("/:id", protect, allowRoles("admin"), updateContact);
router.delete("/:id", protect, allowRoles("admin"), deleteContact);

module.exports = router;
