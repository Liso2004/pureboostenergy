USE VortexXcel;

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Premium Protein Shaker', 'Leak-proof shaker bottle with mixing ball and measurement markings.', 29.99, 'Accessories', 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Premium Protein Shaker');

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Resistance Bands Set', 'Complete set of 5 resistance bands for full-body workouts.', 49.99, 'Training', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Resistance Bands Set');

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Adjustable Dumbbells', 'Space-saving adjustable dumbbells with quick-change system.', 299.99, 'Weights', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Adjustable Dumbbells');

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Performance Training Tee', 'Moisture-wicking athletic shirt with antimicrobial treatment.', 39.99, 'Tops', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Performance Training Tee');

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Compression Leggings', 'High-performance compression leggings with phone pocket.', 69.99, 'Bottoms', 'https://images.unsplash.com/photo-1506629905773-0b6b7d10dbf3?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Compression Leggings');

INSERT INTO Products (product_name, description, price, category, image_url, stock_quantity)
SELECT 'Athletic Hoodie', 'Lightweight hoodie perfect for pre and post-workout comfort.', 89.99, 'Outerwear', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', 100
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE product_name = 'Athletic Hoodie');