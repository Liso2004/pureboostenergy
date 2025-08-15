import React from 'react';
import HeroVideo from '../components/sections/HeroVideo';
import ProductGrid from '../components/sections/ProductGrid';
import Features from '../components/sections/Features';

const HomePage = ({ products, activeCategory, onAddToCart, categoryName }) => {
  return (
    <>
      <HeroVideo />
      <ProductGrid 
        products={products[activeCategory]} 
        categoryName={categoryName}
        onAddToCart={onAddToCart}
      />
      <Features />
    </>
  );
};

export default HomePage;