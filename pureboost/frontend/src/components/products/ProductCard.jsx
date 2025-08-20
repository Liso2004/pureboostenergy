import React from "react"; 
import { Heart, Star } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product, onAddToCart }) => {
  const { wishlist, addToWishlist } = useWishlist();

  // Check if product is already in wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:scale-105 border border-gray-200">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
            {product.category || "Uncategorized"}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
            <span className="text-sm text-gray-600">{product.rating || 4.5}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description || "No description available."}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-black">
            {new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(product.price || 0)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
