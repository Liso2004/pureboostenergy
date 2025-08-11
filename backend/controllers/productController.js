// controllers/productController.js
const db = require("../config/db");

// GET all products
exports.getAllProducts = async (req, res) => {
   try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [products] = await db.query("SELECT * FROM Products LIMIT ? OFFSET ?", [limit, offset]);
    const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM Products");

    res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products,
    });
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

// UPDATE product (admin)
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
  try {
    const { q, minPrice, maxPrice, category, inStock } = req.query;

    let sql = "SELECT * FROM Products WHERE 1=1";
    let params = [];

    if (q && q.trim() !== "") {
      sql += " AND (product_name LIKE ? OR description LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    if (minPrice && !isNaN(minPrice)) {
      sql += " AND price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice && !isNaN(maxPrice)) {
      sql += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    if (category && category.trim() !== "") {
      sql += " AND category LIKE ?";
      params.push(category);
    }

    if (inStock === "true") {
      sql += " AND stock_quantity > 0";
    }

    const [results] = await db.query(sql, params);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error", error: err });
  }
};
