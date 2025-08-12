// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

router.use(authMiddleware); // all routes require login

router.post("/", addToWishlist);
router.get("/", getWishlist);
router.delete("/:product_id", removeFromWishlist);

module.exports = router;
