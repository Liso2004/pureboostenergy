import React from "react";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product, onAddToCart }) => {
  const { addToWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:scale-105 border border-gray-200">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-black">
            ${product.price}
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