//server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();

const app = express();

//Middleware must come BEFORE your routes
app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/products",productRoutes);
app.use("/cart",cartRoutes);
app.use("/orders", orderRoutes);

//Test Route
app.get("/", (req, res) => {
  res.send("Welcome to PureBoostEnergy API 🚀");
});

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
