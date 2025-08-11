const express = require("express");
const router = express.Router();
const { placeOrder, getOrdersByUser, getOrderDetails } = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");

// Place an order (checkout) - user must be logged in
router.post("/", authenticateToken, placeOrder);

// Get all orders (admin) or user-specific orders - user must be logged in
router.get("/user/:user_id", authenticateToken, getOrdersByUser);

// Get order details by order ID - user must be logged in
router.get("/details/:order_id", authenticateToken, getOrderDetails);

module.exports = router;
