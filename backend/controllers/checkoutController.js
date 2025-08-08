const db = require("../config/db");

exports.checkoutCart = async (req, res) => {
  const { user_id } = req.body;

  try {
    const [cart] = await db.query("SELECT * FROM Cart WHERE user_id = ?", [user_id]);
    if (cart.length === 0) return res.status(400).json({ message: "Cart not found" });

    const cartId = cart[0].cart_id;

    const [items] = await db.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM CartItems ci
       JOIN Products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = ?`, [cartId]
    );

    if (items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create Order
    const [orderResult] = await db.query(
      "INSERT INTO Orders (user_id, total_amount) VALUES (?, ?)",
      [user_id, total]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await db.query(
        "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price]
      );

      // 🧮 Update stock
      await db.query(
        "UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
        [item.quantity, item.product_id]
      );
    }

    // Clear cart
    await db.query("DELETE FROM CartItems WHERE cart_id = ?", [cartId]);

    res.status(200).json({ message: "Checkout successful", order_id: orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
