// src/pages/WishlistPage.jsx
import React from "react";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-3 font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold">${product.price}</span>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
