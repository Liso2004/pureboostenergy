import React, { useState } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import { productData, categories } from './data/products';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCartItemsCount(prev => prev + 1);
    setGuestCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handlePaymentSuccess = (order) => {
    setOrderDetails(order);
    alert("Order placed successfully!");
  };

  const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name;

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={() => setShowCheckout(!showCheckout)} 
      />
      
      {!showCheckout ? (
        <HomePage 
          products={productData}
          activeCategory={activeCategory}
          onAddToCart={addToCart}
          categoryName={currentCategoryName}
        />
      ) : (
        <CheckoutPage
          userId={userId}
          guestCart={guestCart}
          onPaymentSuccess={handlePaymentSuccess}
          orderDetails={orderDetails}
          onBackToShopping={() => setShowCheckout(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default App;