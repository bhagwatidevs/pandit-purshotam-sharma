const express = require("express");
const router = express.Router();
const { subscribe, getSubscribers, updateSubscriber, deleteSubscriber } = require("../controllers/subscriberController");
const { protect, allowRoles } = require("../middleware/authMiddleware");

router.post("/", subscribe);
router.get("/", protect, allowRoles("admin"), getSubscribers);
router.put("/:id", protect, allowRoles("admin"), updateSubscriber);
router.delete("/:id", protect, allowRoles("admin"), deleteSubscriber);

module.exports = router;
