import React from 'react';
import ProductCard from '../products/ProductCard';

const ProductGrid = ({ products, categoryName, onAddToCart }) => {
  return (
    <section id="product-grid" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-black mb-3 tracking-tight">
            {categoryName}
          </h2>
          <p className="text-gray-500 text-lg">
            Premium quality products for peak performance
          </p>
          <div className="mt-2 h-1 w-20 bg-black mx-auto rounded"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
