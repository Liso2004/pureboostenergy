import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './components/checkout/OrderConfirmation';
import Login from './pages/Loginpage';
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/profilepage"; // <-- import profile page
import { productData, categories } from './data/products';

const App = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Add to cart
  const addToCart = (product) => {
    setCartItemsCount(prev => prev + 1);
    setGuestCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setOrderDetails({ id: Math.floor(Math.random() * 100000) });
    setShowConfirm(true);
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handlePaymentSuccess = (order) => {
    setOrderDetails(order);
    setShowConfirm(true);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name;

  // Conditional rendering for header and footer
  const showHeaderFooter = location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-white">
      {showHeaderFooter && (
        <Header
          cartItemsCount={cartItemsCount}
          onCartClick={() => setShowCheckout(!showCheckout)}
          loggedIn={loggedIn}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          wishlistCount={wishlist.length}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            !showCheckout ? (
              <HomePage
                products={productData}
                activeCategory={activeCategory}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
                categoryName={currentCategoryName}
              />
            ) : (
              <CheckoutPage
                userId={userId}
                cartItems={guestCart}
                onPaymentSuccess={handlePaymentSuccess}
                orderDetails={orderDetails}
                onBackToShopping={() => setShowCheckout(false)}
              />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<ProfilePage />} /> {/* <-- added profile route */}
      </Routes>

      {showHeaderFooter && <Footer />}

      <OrderConfirmation
        orderDetails={orderDetails}
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default App;
