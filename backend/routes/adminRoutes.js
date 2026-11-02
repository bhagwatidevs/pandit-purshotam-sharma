const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getAllUsers,
} = require("../controllers/adminController");

const { protect, allowRoles } = require("../middleware/authMiddleware");

router.use(protect, allowRoles("admin"));

router.get("/orders", getAllOrders);
router.patch("/orders/:orderId", updateOrderStatus);
router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);

module.exports = router;
