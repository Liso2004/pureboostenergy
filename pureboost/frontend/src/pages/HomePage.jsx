import React from 'react';
import HeroVideo from '../components/sections/HeroVideo';
import ProductGrid from '../components/sections/ProductGrid';
import Features from '../components/sections/Features';

const HomePage = ({ products, activeCategory, onAddToCart, categoryName }) => {
  // Map frontend categories to database categories
  const categoryMap = {
    drinks: ["Energy Drink", "Sports Drink", "Wellness Drink"],
    equipment: ["Equipment"],
    sportswear: ["Sportswear"]
  };

  const filteredProducts = products.filter(
    (p) => categoryMap[activeCategory]?.includes(p.category)
  );

  return (
    <>
      <HeroVideo />
      <ProductGrid 
        products={filteredProducts} 
        categoryName={categoryName}
        onAddToCart={onAddToCart}
      />
      <Features />
    </>
  );
};

export default HomePage;
