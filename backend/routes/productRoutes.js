const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { searchProducts } = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");

// Admin-only middleware
const authorizeAdmin = (req, res, next) => {
if (!req.user || req.user.role.toLowerCase() !== 'admin') {
  return res.status(403).json({ message: 'Admins only' });
}
  next();
};

// 🔓 Public routes (anyone can view)
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/search", searchProducts);

// 🔒 Admin-only routes
router.post("/", authenticateToken, authorizeAdmin, productController.addProduct);
router.put("/:id", authenticateToken, authorizeAdmin, productController.updateProduct);
router.delete("/:id", authenticateToken, authorizeAdmin, productController.deleteProduct);

module.exports = router;
