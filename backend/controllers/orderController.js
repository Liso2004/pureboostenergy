const db = require("../config/db");

// Place an order (checkout)
exports.placeOrder = async (req, res) => {
  const { user_id } = req.body;

  try {
    // 1. Get user's cart id and cart items with product prices
    const [[cart]] = await db.query("SELECT cart_id FROM Cart WHERE user_id = ?", [user_id]);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const [cartItems] = await db.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM CartItems ci
       JOIN Products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = ?`,
      [cart.cart_id]
    );

    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // 2. Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // 3. Insert into Orders table
    const [orderResult] = await db.query(
      "INSERT INTO Orders (user_id, total_amount) VALUES (?, ?)",
      [user_id, totalAmount]
    );

    const orderId = orderResult.insertId;

    // 4. Insert into OrderItems table
    const orderItemsData = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);
    await db.query(
      "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ?",
      [orderItemsData]
    );

    // 5. Clear user's cart and cart items
    await db.query("DELETE FROM CartItems WHERE cart_id = ?", [cart.cart_id]);
    await db.query("DELETE FROM Cart WHERE cart_id = ?", [cart.cart_id]);

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// Get all orders for a user
exports.getOrdersByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [orders] = await db.query(
      "SELECT * FROM Orders WHERE user_id = ? ORDER BY order_date DESC",
      [user_id]
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// Get details of an order (items)
exports.getOrderDetails = async (req, res) => {
  const { order_id } = req.params;

  try {
    const [orderItems] = await db.query(
      `SELECT oi.order_item_id, oi.product_id, oi.quantity, oi.price, p.product_name, p.description, p.image_url
       FROM OrderItems oi
       JOIN Products p ON oi.product_id = p.product_id
       WHERE oi.order_id = ?`,
      [order_id]
    );

    if (!orderItems.length) return res.status(404).json({ message: "Order items not found" });

    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order details" });
  }
};
