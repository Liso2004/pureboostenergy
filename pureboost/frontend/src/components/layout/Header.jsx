import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Search, Heart, Zap, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/products";

const Header = ({ cartItemsCount, onCartClick, loggedIn, activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch products when searchQuery or activeCategory changes
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${API_BASE}/search`, {
          params: { q: query, category: "", page: 1, limit: 5 } // global search ignores category
        });

        const results = response.data.results.map((p) => ({
          id: p.product_id,
          name: p.product_name,
          category: p.category,
          price: p.price,
          image: p.image_url || "https://via.placeholder.com/50",
          rating: p.rating || 4.5,
        }));

        setSearchResults(results);
        setShowDropdown(results.length > 0);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 300); // debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery]); // ✅ fixed: only fixed-length dependencies

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatZAR = (value) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="bg-black border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-white">
            <Zap className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">PureBoost</span>
            <span className="text-gray-400 text-sm">Energy</span>
          </div>

          {/* Search + Navigation */}
          <div className="hidden md:flex flex-1 items-center space-x-6 mx-8 relative" ref={dropdownRef}>
            {/* Search Bar */}
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
              />

              {/* Live Search Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <ul className="absolute z-50 w-full bg-gray-900 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                        <div>
                          <span className="block font-medium text-white">{product.name}</span>
                          <span className="text-gray-400 text-xs">{product.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400 font-semibold">{formatZAR(product.price)}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Navigation Links */}
            <Navigation activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 text-white">
            <button className="relative hover:text-yellow-400 transition-colors" onClick={() => navigate("/wishlist")}>
              <Heart className="h-6 w-6" />
            </button>

            <button className="relative hover:text-yellow-400 transition-colors" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button className="relative hover:text-yellow-400 transition-colors" onClick={() => navigate("/account")}>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
