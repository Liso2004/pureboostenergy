import React from 'react';
import { Coffee, Dumbbell, Shirt } from 'lucide-react';

const Navigation = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'drinks', name: 'Drinks', icon: Coffee },
    { id: 'equipment', name: 'Equipment', icon: Dumbbell },
    { id: 'sportswear', name: 'Sportswear', icon: Shirt }
  ];

  return (
    <nav className="absolute top-16 left-0 w-full z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8 bg-gradient-to-b from-black/50 to-transparent rounded-lg py-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 py-2 px-4 border-b-2 transition-all text-white ${
                  activeCategory === category.id
                    ? 'border-white font-semibold'
                    : 'border-transparent text-gray-200 hover:text-white hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
