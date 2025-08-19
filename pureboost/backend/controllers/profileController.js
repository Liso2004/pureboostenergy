const db = require('../config/db'); // your MySQL connection

// GET user profile
exports.getProfile = async (req, res) => {
  const userId = req.user.user_id; // ✅ matches JWT payload

  try {
    const [rows] = await db.query(
      "SELECT user_id, name, surname, username, email, contact_number, role FROM Users WHERE user_id = ?",
      [userId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE user profile
exports.updateProfile = async (req, res) => {
  const userId = req.user.user_id; // ✅ matches JWT payload
  const { name, surname, username, email, contact_number } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE Users SET name = ?, surname = ?, username = ?, email = ?, contact_number = ? WHERE user_id = ?",
      [name, surname, username, email, contact_number, userId]
    );

    // Return updated user
    const [rows] = await db.query(
      "SELECT user_id, name, surname, username, email, contact_number, role FROM Users WHERE user_id = ?",
      [userId]
    );

    res.json({ message: "Profile updated", user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET user orders
exports.getOrders = async (req, res) => {
  const userId = req.user.user_id; // ✅ matches JWT payload
  try {
    const [orders] = await db.query('SELECT * FROM Orders WHERE user_id = ?', [userId]);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// REQUEST REFUND
exports.requestRefund = async (req, res) => {
  const userId = req.user.id;
  const { order_id, items, reason } = req.body; // items = array of product_ids

  if (!order_id || !items || items.length === 0 || !reason) {
    return res.status(400).json({ message: "Order ID, items, and reason are required" });
  }

  try {
    // Insert refund request (dummy table Refunds - create if not exists)
    await db.query(
      "INSERT INTO Refunds (user_id, order_id, items, reason, status, created_at) VALUES (?, ?, ?, ?, 'Pending', NOW())",
      [userId, order_id, JSON.stringify(items), reason]
    );

    res.json({ message: "Refund request submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
