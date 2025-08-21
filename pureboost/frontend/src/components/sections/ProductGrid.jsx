import React from "react";
import ProductCard from "../products/ProductCard";

const ProductGrid = ({ products = [], categoryName, onAddToCart }) => {
  return (
    <section id="product-grid" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-black mb-3 tracking-tight">
            {categoryName || "Products"}
          </h2>
          <p className="text-gray-500 text-lg">
            Premium quality products for peak performance
          </p>
          <div className="mt-2 h-1 w-20 bg-black mx-auto rounded"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => {
              const mappedProduct = {
                id: product.product_id || product.id,
                product_name: product.product_name || product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image_url: product.image_url || product.image || "https://via.placeholder.com/400",
                rating: product.rating || 4.5,
                stock_quantity: product.stock_quantity || 0,
              };

              return (
                <ProductCard
                  key={mappedProduct.id}
                  product={mappedProduct}
                  onAddToCart={onAddToCart}
                />
              );
            })
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
