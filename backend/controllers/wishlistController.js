// controllers/wishlistController.js
const db = require("../config/db");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  const { user_id } = req.user; // assuming token middleware adds user object
  const { product_id } = req.body;

  try {
    await db.query("INSERT INTO Wishlist (user_id, product_id) VALUES (?, ?)", [user_id, product_id]);
    res.status(201).json({ message: "Product added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product to wishlist" });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  const { user_id } = req.user;

  try {
    const [wishlist] = await db.query(
      `SELECT W.product_id, P.product_name, P.price, P.category
       FROM Wishlist W
       JOIN Products P ON W.product_id = P.product_id
       WHERE W.user_id = ?`,
      [user_id]
    );
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve wishlist" });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { user_id } = req.user;
  const { product_id } = req.params;

  try {
    await db.query("DELETE FROM Wishlist WHERE user_id = ? AND product_id = ?", [user_id, product_id]);
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove product" });
  }
};
