import React from 'react';
import { Coffee, Dumbbell, Shirt } from 'lucide-react';

const Navigation = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'drinks', name: 'Drinks', icon: Coffee },
    { id: 'equipment', name: 'Equipment', icon: Dumbbell },
    { id: 'sportswear', name: 'Sportswear', icon: Shirt }
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-2 transition-all ${
                  activeCategory === category.id
                    ? 'border-black text-black font-semibold'
                    : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
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