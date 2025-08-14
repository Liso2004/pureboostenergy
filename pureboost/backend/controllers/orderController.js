const db = require("../config/db");

// Process payment (guest or logged-in user)
exports.processPayment = async (req, res) => {
  try {
    const { cartItems, paymentDetails, guestInfo, userId } = req.body;

    // 1. Validate cart and payment
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }
    if (!paymentDetails || !paymentDetails.method) {
      return res.status(400).json({ error: "Payment details missing" });
    }

    // 2. Check stock for each product
    for (let item of cartItems) {
      const [[product]] = await db.query(
        "SELECT stock_quantity FROM Products WHERE product_id = ?",
        [item.product_id]
      );
      if (!product) {
        return res.status(404).json({ error: `Product ${item.product_id} not found` });
      }
      if (item.quantity > product.stock_quantity) {
        return res.status(400).json({ error: `Not enough stock for product ${item.product_id}` });
      }
    }

    // 3. Simulate payment success
    const paymentSuccess = true; // Replace with real payment gateway
    if (!paymentSuccess) {
      return res.status(402).json({ error: "Payment failed" });
    }

    // 4. Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 5. Insert order
    const [orderResult] = await db.query(
      "INSERT INTO Orders (user_id, guest_email, total_amount, payment_method, status) VALUES (?, ?, ?, ?, ?)",
      [userId || null, guestInfo?.email || null, totalAmount, paymentDetails.method, "paid"]
    );
    const orderId = orderResult.insertId;

    // 6. Insert order items
    const orderItemsData = cartItems.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);
    await db.query(
      "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ?",
      [orderItemsData]
    );

    // 7. Update product stock
    for (let item of cartItems) {
      await db.query(
        "UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
        [item.quantity, item.product_id]
      );
    }

    // 8. Clear cart (logged-in users only)
    if (userId) {
      const [[cart]] = await db.query("SELECT cart_id FROM Cart WHERE user_id = ?", [userId]);
      if (cart) {
        await db.query("DELETE FROM CartItems WHERE cart_id = ?", [cart.cart_id]);
        await db.query("DELETE FROM Cart WHERE cart_id = ?", [cart.cart_id]);
      }
    }

    res.json({
      message: "Payment processed and order created",
      orderId,
      totalAmount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during payment processing" });
  }
};

// Get orders by user or all orders (admin)
exports.getOrdersByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const role = req.user.role; // attached by auth middleware

    let query, params;
    if (role === "admin") {
      query = "SELECT * FROM Orders ORDER BY created_at DESC";
      params = [];
    } else {
      query = "SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC";
      params = [user_id];
    }

    const [orders] = await db.query(query, params);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get order details by order ID
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

    if (!orderItems.length) {
      return res.status(404).json({ message: "Order items not found" });
    }

    res.status(200).json(orderItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order details" });
  }
};

// Place order for logged-in users
exports.placeOrder = async (req, res) => {
  const { user_id } = req.body;
  // You can call processPayment here with userId and user's cart
  res.status(200).json({ message: "Use /process-payment for checkout" });
};
