const db = require("../config/db");

async function authorizeCartItem(req, res, next) {
  const userId = req.user.user_id;
  const cartItemId = req.params.cart_item_id;

  try {
    const [rows] = await db.query(
      `SELECT Cart.user_id FROM Cart 
       JOIN CartItems ON Cart.cart_id = CartItems.cart_id
       WHERE CartItems.cart_item_id = ?`,
      [cartItemId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (rows[0].user_id !== userId) {
      return res.status(403).json({ message: "You do not have permission to modify this cart item" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = authorizeCartItem;
