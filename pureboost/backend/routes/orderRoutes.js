const express = require("express");
const router = express.Router();
const { placeOrder, getOrdersByUser, getOrderDetails,processPayment } = require("../controllers/orderController");
const authenticateToken = require("../middleware/authMiddleware");

//guests can pay without login so im leaving it without auth
router.post("/process-payment",processPayment);

// // Add the payment processing route here:
// router.post("/process-payment", (req, res) => {
//   let guestInfo = null;
//   const cookie = req.cookies.guestCheckoutInfo;
//   if (cookie) {
//     try {
//       guestInfo = JSON.parse(cookie);
//     } catch {}
//   }

//   // TODO: Use guestInfo.email, guestInfo.cartId to associate payment/order

//   res.json({ message: "Payment processed", guestInfo });
// });

// Place an order (checkout) - user must be logged in
router.post("/", authenticateToken, placeOrder);

// Get all orders (admin) or user-specific orders - user must be logged in
router.get("/user/:user_id", authenticateToken, getOrdersByUser);

// Get order details by order ID - user must be logged in
router.get("/details/:order_id", authenticateToken, getOrderDetails);

module.exports = router;
