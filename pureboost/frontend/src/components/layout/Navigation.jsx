import React from 'react';
import { Coffee, Dumbbell, Shirt, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const categories = [
    { id: 'drinks', name: 'Drinks', icon: Coffee },
    { id: 'equipment', name: 'Equipment', icon: Dumbbell },
    { id: 'sportswear', name: 'Sportswear', icon: Shirt },
  ];

  // Check login status
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(user && token);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center space-x-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
              activeCategory === category.id
                ? 'bg-black text-white font-semibold'
                : 'bg-white text-black hover:bg-black/10'
            }`}
          >
            <IconComponent className="h-4 w-4" />
            <span>{category.name}</span>
          </button>
        );
      })}

      {/* Right side: Login / Account */}
      <div className="ml-auto flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/account')}
              className="flex items-center space-x-1 px-3 py-2 bg-white text-black rounded hover:bg-white/90"
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center space-x-1 px-3 py-2 bg-white text-black rounded hover:bg-white/90"
          >
            <User className="h-4 w-4" />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
