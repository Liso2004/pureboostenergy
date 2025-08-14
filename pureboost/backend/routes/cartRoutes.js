const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { getGuestCart } = require('../controllers/cartController');

const authenticateToken = require("../middleware/authMiddleware");
const authorizeUser = require("../middleware/authorizeUser");
const authorizeCartItem = require("../middleware/authorizeCartItem");


//guest route for the cookies
router.get('/guest/:cartId', getGuestCart);

// POST /cart/guest/add — add items to guest cart
router.post("/guest/add", cartController.addToGuestCart);


// Protect routes with authentication and authorization
router.get("/:user_id", authenticateToken, authorizeUser, cartController.getCartByUser);
router.post("/add", authenticateToken, authorizeUser, cartController.addToCart);
router.put("/update/:cart_item_id", authenticateToken, authorizeCartItem, cartController.updateCartItem);
router.delete("/delete/:cart_item_id", authenticateToken, authorizeCartItem, cartController.deleteCartItem);

module.exports = router;
