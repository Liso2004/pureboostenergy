const db = require("../config/db");

// Add this new controller function for payment processing:
// controllers/orderController.js
exports.processPayment = async (req, res) => {
  try {
    const { cartItems, paymentDetails, guestInfo, userId } = req.body;

    // Validate cart and payment details (basic check)
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }
    if (!paymentDetails || !paymentDetails.method) {
      return res.status(400).json({ error: "Payment details missing" });
    }

    // Here, integrate with real payment gateway (Stripe, PayPal, etc.)
    // For now, simulate a successful payment:
    const paymentSuccess = true;

    if (!paymentSuccess) {
      return res.status(402).json({ error: "Payment failed" });
    }

    // Save order to DB (simplified here, replace with real DB code)
    const order = {
      userId: userId || null,
      guestEmail: guestInfo?.email || null,
      items: cartItems,
      amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      paymentMethod: paymentDetails.method,
      status: "paid",
      createdAt: new Date(),
    };

    // TODO: Save 'order' in your database, get order ID, etc.

    return res.json({ message: "Payment processed and order created", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error during payment processing" });
  }
};


// Place an order (checkout)
exports.placeOrder = async (req, res) => {
  const { user_id } = req.body;

  try {
    // 1. Get user's cart id
    const [[cart]] = await db.query(
      "SELECT cart_id FROM Cart WHERE user_id = ?",
      [user_id]
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // 2. Get cart items with price and stock
    const [cartItems] = await db.query(
      `SELECT ci.product_id, ci.quantity, p.price, p.stock_quantity
       FROM CartItems ci
       JOIN Products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = ?`,
      [cart.cart_id]
    );

    if (cartItems.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // 3. Check stock availability
    for (let item of cartItems) {
      if (item.quantity > item.stock_quantity) {
        return res.status(400).json({
          message: `Not enough stock for product ID ${item.product_id}`,
        });
      }
    }

    // 4. Calculate total amount
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    // 5. Insert into Orders table
    const [orderResult] = await db.query(
      "INSERT INTO Orders (user_id, total_amount) VALUES (?, ?)",
      [user_id, totalAmount]
    );
    const orderId = orderResult.insertId;

    // 6. Insert into OrderItems table
    const orderItemsData = cartItems.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);
    await db.query(
      "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ?",
      [orderItemsData]
    );

    // 7. Update stock quantities
    for (let item of cartItems) {
      await db.query(
        "UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
        [item.quantity, item.product_id]
      );
    }

    // 8. Clear user's cart
    await db.query("DELETE FROM CartItems WHERE cart_id = ?", [cart.cart_id]);
    await db.query("DELETE FROM Cart WHERE cart_id = ?", [cart.cart_id]);

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


// Get orders by user OR all orders (admin)
exports.getOrdersByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const role = req.user.role; // assuming verifyToken middleware attaches this

    let query, params;

    if (role === "admin") {
      query = `SELECT * FROM Orders ORDER BY created_at DESC`;
      params = [];
    } else {
      query = `SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC`;
      params = [user_id];
    }

    const [orders] = await db.query(query, params);

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
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
