const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  const { name, surname, username, email, contact_number, password } = req.body;

  if (!email || !password || !name || !surname || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUser] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    await db.query(
      "INSERT INTO Users (name, surname, username, email, contact_number, password) VALUES (?, ?, ?, ?, ?, ?)",
      [name, surname, username, email, contact_number, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userRows] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);

    if (!userRows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  const token = jwt.sign(
  { user_id: user.user_id, email: user.email, role: user.role },  // include role!
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
