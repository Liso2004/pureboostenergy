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
  role varchar(20),
  password VARCHAR(255)
);
ALTER TABLE Users ADD COLUMN role VARCHAR(20);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(100),
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(50),        -- e.g. Energy Drink, Sports Drink, Apparel
  image_url TEXT               -- URL to product image
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
  total_amount DECIMAL(10,2),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO Products (product_name, description, price, category, image_url)
VALUES
  ('Citrus Mint Clarity', 'Green tea with lemon-lime, L-theanine, and vitamin C for calm alertness.', 19.99, 'Energy Drink', NULL),
  ('Berry Adaptogen Boost', 'Blackberry-blueberry blend with ashwagandha and Rhodiola for stress-resilient energy.', 21.99, 'Energy Drink', NULL),
  ('Tropical Electrolyte Recharge', 'Coconut water + pineapple with electrolytes and yerba maté for post-workout recovery.', 22.50, 'Sports Drink', NULL),
  ('Ginger-Lemon Immunity Spark', 'Ginger, turmeric, and lemon with green coffee bean for a wellness-focused energy boost.', 20.00, 'Energy Drink', NULL),
  ('Calm Focus Chill', 'Rooibos-chamomile blend with L-theanine and bacopa for low-stim clarity and focus.', 18.50, 'Wellness Drink', NULL);
