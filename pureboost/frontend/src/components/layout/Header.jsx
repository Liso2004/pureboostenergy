import React from 'react';
import { ShoppingCart, User, Search, Heart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Header = ({ cartItemsCount, onCartClick, loggedIn, activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

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
          <div className="hidden md:flex flex-1 items-center space-x-6 mx-8">
            {/* Search Bar */}
            <div className="relative w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>

            {/* Navigation Links */}
            <Navigation
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 text-white">
            {/* Wishlist */}
            <button
              className="relative hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <button
              className="relative hover:text-yellow-400 transition-colors"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Account / Profile */}
            <button
              className="relative hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/account")}
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
