const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeUser = require("../middleware/authorizeUser");
const authorizeCartItem = require("../middleware/authorizeCartItem");

// Protect routes with authentication and authorization
router.get("/:user_id", authenticateToken, authorizeUser, cartController.getCartByUser);
router.post("/add", authenticateToken, authorizeUser, cartController.addToCart);
router.put("/update/:cart_item_id", authenticateToken, authorizeCartItem, cartController.updateCartItem);
router.delete("/delete/:cart_item_id", authenticateToken, authorizeCartItem, cartController.deleteCartItem);

module.exports = router;
