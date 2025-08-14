const express = require("express");
const router = express.Router();
const {
  processPayment,
  placeOrder,
  getOrdersByUser,
  getOrderDetails
} = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");

// Guest or logged-in user payment
router.post("/process-payment", processPayment);

// Place order (only logged-in users, optional shortcut)
router.post("/", authenticateToken, placeOrder);

// Get orders for a user (or all for admin)
router.get("/user/:user_id", authenticateToken, getOrdersByUser);

// Get order details by order ID
router.get("/details/:order_id", authenticateToken, getOrderDetails);

module.exports = router;
