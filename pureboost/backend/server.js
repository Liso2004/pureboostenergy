//server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require ("cookie-parser")//for cookies 

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes");
const profileRoutes = require('./routes/profileRoutes');



dotenv.config();
const app = express();

//Middleware must come BEFORE your routes
app.use(cors({
  origin: "http://localhost:3000", // CRA default port
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // enable cookie parsing

//Routes
app.use("/auth", authRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);
app.use("/orders", orderRoutes);
app.use('/profile', profileRoutes);


// Set dynamic cookie
app.post("/set-cookie", (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: "Cookie name and value are required" });
  }
  res.cookie(name, value, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: `🍪 Cookie '${name}' has been set!` });
});

// Get cookie by name
app.get("/get-cookie/:name", (req, res) => {
  const cookieValue = req.cookies[req.params.name];
  if (!cookieValue) return res.status(404).send("Cookie not found");
  res.send(`Cookie Value: ${cookieValue}`);
});

// Clear cookie by name
app.post("/clear-cookie/:name", (req, res) => {
  res.clearCookie(req.params.name);
  res.json({ message: `❌ Cookie '${req.params.name}' cleared!` });
});

//Test Route
app.get("/", (req, res) => {
  res.send("Welcome to PureBoostEnergy API 🚀");
});

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
