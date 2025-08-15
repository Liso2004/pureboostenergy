import React from 'react';
import { ShoppingCart, User, Search, Heart, Zap } from 'lucide-react';

const Header = ({ cartItemsCount, onCartClick }) => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">PureBoost</span>
            <span className="text-gray-400 text-sm">Energy</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white focus:bg-gray-700 text-white transition-colors"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative hover:text-gray-300 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="relative hover:text-gray-300 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button 
              className="relative hover:text-gray-300 transition-colors"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;