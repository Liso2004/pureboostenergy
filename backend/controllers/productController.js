// controllers/productController.js
const db = require("../config/db");

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM Products");
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// GET product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await db.query("SELECT * FROM Products WHERE product_id = ?", [id]);
    if (!product.length) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// ADD product (admin)
exports.addProduct = async (req, res) => {
  const { product_name, description, price, category, stock_quantity } = req.body;

  if (!product_name || !price || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.query(
      "INSERT INTO Products (product_name, description, price, category, stock_quantity) VALUES (?, ?, ?, ?, ?)",
      [product_name, description, price, category, stock_quantity || 0]
    );
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product" });
  }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, description, price, category, stock_quantity } = req.body;

  try {
    await db.query(
      "UPDATE Products SET product_name=?, description=?, price=?, category=?, stock_quantity=? WHERE product_id=?",
      [product_name, description, price, category, stock_quantity, id]
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Products WHERE product_id = ?", [id]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

exports.searchProducts = async (req, res) => {
  const { search, category } = req.query;

  let sql = "SELECT * FROM Products WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND product_name LIKE ?";
    params.push(`%${search}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  try {
    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
