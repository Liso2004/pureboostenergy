-- Create the main database
CREATE DATABASE IF NOT EXISTS VortexXcel;
USE VortexXcel;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  surname VARCHAR(100),
  username VARCHAR(100) UNIQUE,
  email VARCHAR(100) UNIQUE,
  contact_number VARCHAR(20),
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  password VARCHAR(255)
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(50),        -- e.g. Energy Drink, Sports Drink, Apparel
  image_url TEXT,              -- URL to product image
  stock_quantity INT NOT NULL DEFAULT 0
);

-- CART TABLE
CREATE TABLE IF NOT EXISTS Cart (
  cart_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE,  -- one cart per user
  total_amount DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS CartItems (
  cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
  cart_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS Orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  guest_email VARCHAR(100),
  total_amount DECIMAL(10,2),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Pending',
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS OrderItems (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Sample Products Insert (Energy Drinks)
INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
VALUES
  ('Citrus Mint Clarity', 'Green tea with lemon-lime, L-theanine, and vitamin C for calm alertness.', 19.99, 'Energy Drink', NULL, 100),
  ('Berry Adaptogen Boost', 'Blackberry-blueberry blend with ashwagandha and Rhodiola for stress-resilient energy.', 21.99, 'Energy Drink', NULL, 100),
  ('Tropical Electrolyte Recharge', 'Coconut water + pineapple with electrolytes and yerba maté for post-workout recovery.', 22.50, 'Sports Drink', NULL, 100),
  ('Ginger-Lemon Immunity Spark', 'Ginger, turmeric, and lemon with green coffee bean for a wellness-focused energy boost.', 20.00, 'Energy Drink', NULL, 100),
  ('Calm Focus Chill', 'Rooibos-chamomile blend with L-theanine and bacopa for low-stim clarity and focus.', 18.50, 'Wellness Drink', NULL, 100),
  ('Premium Protein Shaker', 'Leak-proof shaker bottle with mixing ball and measurement markings.', 29.99, 'Accessories', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop', 100),
  ('Resistance Bands Set', 'Complete set of 5 resistance bands for full-body workouts.', 49.99, 'Training', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', 100),
  ('Adjustable Dumbbells', 'Space-saving adjustable dumbbells with quick-change system.', 299.99, 'Weights', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', 100),
  ('Performance Training Tee', 'Moisture-wicking athletic shirt with antimicrobial treatment.', 39.99, 'Tops', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', 100),
  ('Compression Leggings', 'High-performance compression leggings with phone pocket.', 69.99, 'Bottoms', 'https://images.unsplash.com/photo-1506629905773-0b6b7d10dbf3?w=300&h=300&fit=crop', 100),
  ('Athletic Hoodie', 'Lightweight hoodie perfect for pre and post-workout comfort.', 89.99, 'Outerwear', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', 100);

-- REFUNDS TABLE
CREATE TABLE IF NOT EXISTS Refunds (
  refund_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_id INT NOT NULL,
  items JSON NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
