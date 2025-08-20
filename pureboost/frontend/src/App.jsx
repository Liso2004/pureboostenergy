import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./components/checkout/OrderConfirmation";
import Login from "./pages/Loginpage";
import ProfilePage from "./pages/profilepage";
import WishlistPage from "./pages/WishlistPage";

import { WishlistProvider } from "./context/WishlistContext";

// ✅ Centralized API base URL
const API_BASE = "http://localhost:5000/products"; // points directly to products route

const App = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("drinks");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Categories
  const categories = [
    { id: "drinks", name: "Drinks" },
    { id: "equipment", name: "Equipment" },
    { id: "sportswear", name: "Sportswear" },
  ];

  // ✅ Fetch products whenever category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(API_BASE, {
          params: {
            page: 1,
            limit: 20,
            category: activeCategory,
          },
        });

        console.log("Backend response:", res.data);

        const mappedProducts = res.data.products.map((p) => ({
          id: p.product_id,
          name: p.product_name,
          description: p.description,
          price: p.price,
          category: p.category,
          image: p.image || "https://via.placeholder.com/300",
          rating: p.rating || 4.5,
          stock_quantity: p.stock_quantity,
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setProducts([]); // reset products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // ✅ Add to cart
  const addToCart = (product) => {
    setCartItemsCount((prev) => prev + 1);
    setGuestCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    setOrderDetails({ id: Math.floor(Math.random() * 100000) });
    setShowConfirm(true);
  };

  const handlePaymentSuccess = (order) => {
    setOrderDetails(order);
    setShowConfirm(true);
    setGuestCart([]); // clear cart after successful checkout
    setCartItemsCount(0);
  };

  const handleLoginSuccess = () => setLoggedIn(true);

  const currentCategoryName =
    categories.find((cat) => cat.id === activeCategory)?.name;

  const showHeaderFooter = location.pathname !== "/login";

  return (
    <WishlistProvider>
      <div className="min-h-screen bg-white">
        {showHeaderFooter && (
          <Header
            cartItemsCount={cartItemsCount}
            onCartClick={() => setShowCheckout(!showCheckout)}
            loggedIn={loggedIn}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              !showCheckout ? (
                <HomePage
                  products={products}
                  activeCategory={activeCategory}
                  onAddToCart={addToCart}
                  categoryName={currentCategoryName}
                  loading={loading}
                  error={error}
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
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>

        {showHeaderFooter && <Footer />}

        <OrderConfirmation
          orderDetails={orderDetails}
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
        />
      </div>
    </WishlistProvider>
  );
};

export default App;
