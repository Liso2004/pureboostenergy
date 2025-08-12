const db = require("../config/db");

// Get cart for a user with all items
exports.getCartByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Get cart ID
    const [cartRows] = await db.query("SELECT * FROM Cart WHERE user_id = ?", [user_id]);
    if (cartRows.length === 0) return res.status(200).json({ cart: null, items: [] });

    const cart = cartRows[0];

    // Get cart items with product info
    const [items] = await db.query(
      `SELECT CartItems.cart_item_id, CartItems.quantity, Products.*, (CartItems.quantity * Products.price) AS item_total
       FROM CartItems
       JOIN Products ON CartItems.product_id = Products.product_id
       WHERE CartItems.cart_id = ?`,
      [cart.cart_id]
    );

    res.status(200).json({ cart, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    // Check if product exists
    const [productRows] = await db.query("SELECT price FROM Products WHERE product_id = ?", [product_id]);
    if (productRows.length === 0) return res.status(404).json({ message: "Product not found" });

    const price = productRows[0].price;
    const itemTotal = price * quantity;

    // Get or create cart
    const [cartRows] = await db.query("SELECT * FROM Cart WHERE user_id = ?", [user_id]);

    let cart_id;
    if (cartRows.length === 0) {
      const [insertResult] = await db.query("INSERT INTO Cart (user_id, total_amount) VALUES (?, ?)", [user_id, itemTotal]);
      cart_id = insertResult.insertId;
    } else {
      cart_id = cartRows[0].cart_id;
    }

    // Check if product is already in cart
    const [existingItem] = await db.query(
      "SELECT * FROM CartItems WHERE cart_id = ? AND product_id = ?",
      [cart_id, product_id]
    );

    if (existingItem.length > 0) {
      // Update existing item quantity
      const newQuantity = existingItem[0].quantity + quantity;
      await db.query(
        "UPDATE CartItems SET quantity = ? WHERE cart_item_id = ?",
        [newQuantity, existingItem[0].cart_item_id]
      );
    } else {
      // Insert new item
      await db.query(
        "INSERT INTO CartItems (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cart_id, product_id, quantity]
      );
    }

    // Update total_amount in Cart
    const [totalRows] = await db.query(
      `SELECT SUM(CartItems.quantity * Products.price) AS total
       FROM CartItems
       JOIN Products ON CartItems.product_id = Products.product_id
       WHERE cart_id = ?`,
      [cart_id]
    );

    const updatedTotal = totalRows[0].total || 0;
    await db.query("UPDATE Cart SET total_amount = ? WHERE cart_id = ?", [updatedTotal, cart_id]);

    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// Update item quantity in cart
exports.updateCartItem = async (req, res) => {
  const { cart_item_id } = req.params;
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      await db.query("DELETE FROM CartItems WHERE cart_item_id = ?", [cart_item_id]);
    } else {
      await db.query("UPDATE CartItems SET quantity = ? WHERE cart_item_id = ?", [quantity, cart_item_id]);
    }

    // Update total cart amount
    const [cartIdResult] = await db.query("SELECT cart_id FROM CartItems WHERE cart_item_id = ?", [cart_item_id]);
    if (!cartIdResult.length) return res.status(404).json({ message: "Cart item not found" });

    const cart_id = cartIdResult[0].cart_id;

    const [totalRows] = await db.query(
      `SELECT SUM(CartItems.quantity * Products.price) AS total
       FROM CartItems
       JOIN Products ON CartItems.product_id = Products.product_id
       WHERE cart_id = ?`,
      [cart_id]
    );

    const updatedTotal = totalRows[0].total || 0;
    await db.query("UPDATE Cart SET total_amount = ? WHERE cart_id = ?", [updatedTotal, cart_id]);

    res.status(200).json({ message: "Cart item updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Delete cart item
exports.deleteCartItem = async (req, res) => {
  const { cart_item_id } = req.params;

  try {
    const [cartIdResult] = await db.query("SELECT cart_id FROM CartItems WHERE cart_item_id = ?", [cart_item_id]);
    if (!cartIdResult.length) return res.status(404).json({ message: "Cart item not found" });

    const cart_id = cartIdResult[0].cart_id;

    await db.query("DELETE FROM CartItems WHERE cart_item_id = ?", [cart_item_id]);

    // Update cart total
    const [totalRows] = await db.query(
      `SELECT SUM(CartItems.quantity * Products.price) AS total
       FROM CartItems
       JOIN Products ON CartItems.product_id = Products.product_id
       WHERE cart_id = ?`,
      [cart_id]
    );

    const updatedTotal = totalRows[0].total || 0;
    await db.query("UPDATE Cart SET total_amount = ? WHERE cart_id = ?", [updatedTotal, cart_id]);

    res.status(200).json({ message: "Cart item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting cart item" });
  }
};
