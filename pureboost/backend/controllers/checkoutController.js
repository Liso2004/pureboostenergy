const db = require("../config/db");

exports.checkoutCart = async (req, res) => {
  const userId = req.user.user_id;
  const { payment_method: paymentMethod } = req.body;

  if (!paymentMethod) {
    return res.status(400).json({ message: "Payment method is required" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [cart] = await connection.query(
      "SELECT cart_id FROM Cart WHERE user_id = ? FOR UPDATE",
      [userId]
    );
    if (cart.length === 0) {
      await connection.rollback();
      return res.status(400).json({ message: "Cart not found" });
    }

    const cartId = cart[0].cart_id;

    const [items] = await connection.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM CartItems ci
       JOIN Products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = ?
       FOR UPDATE`, [cartId]
    );

    if (items.length === 0) {
      await connection.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        await connection.rollback();
        return res.status(400).json({ message: "Cart quantities must be positive integers" });
      }
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const [orderResult] = await connection.query(
      "INSERT INTO Orders (user_id, total_amount, payment_method, status) VALUES (?, ?, ?, ?)",
      [userId, total, paymentMethod, "paid"]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price]
      );

      const [stockResult] = await connection.query(
        "UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND stock_quantity >= ?",
        [item.quantity, item.product_id, item.quantity]
      );

      if (stockResult.affectedRows !== 1) {
        throw new Error(`Not enough stock for product ${item.product_id}`);
      }
    }

    await connection.query("DELETE FROM CartItems WHERE cart_id = ?", [cartId]);
    await connection.query("DELETE FROM Cart WHERE cart_id = ?", [cartId]);
    await connection.commit();

    res.status(200).json({ message: "Checkout successful", order_id: orderId });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    const status = err.message.startsWith("Not enough stock") ? 409 : 500;
    res.status(status).json({ message: status === 409 ? err.message : "Checkout failed" });
  } finally {
    connection.release();
  }
};
