import React, { useState } from 'react';
import { ShoppingCart, User, Search, Heart, Star, Zap, Dumbbell, Shirt, Coffee, Award, Truck, Shield, RotateCcw, CreditCard, MapPin, Phone, Mail, Lock, Play, Pause } from 'lucide-react';


const PureBoostEcommerce = () => {
  const [activeCategory, setActiveCategory] = useState('drinks');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories = [
    { id: 'drinks', name: 'Drinks', icon: Coffee },
    { id: 'equipment', name: 'Equipment', icon: Dumbbell },
    { id: 'sportswear', name: 'Sportswear', icon: Shirt }
  ];

  const products = {
    drinks: [
      {
        id: 1,
        name: 'Citrus Mint Clarity',
        description: 'Green tea with lemon-lime, L-theanine, and vitamin C for calm alertness.',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop',
        rating: 4.8,
        category: 'Energy Drink'
      },
      {
        id: 2,
        name: 'Berry Adaptogen Boost',
        description: 'Blackberry-blueberry blend with ashwagandha and Rhodiola for stress-resilient energy.',
        price: 21.99,
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop',
        rating: 4.9,
        category: 'Energy Drink'
      },
      {
        id: 3,
        name: 'Tropical Electrolyte Recharge',
        description: 'Coconut water + pineapple with electrolytes and yerba maté for post-workout recovery.',
        price: 22.50,
        image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=300&h=300&fit=crop',
        rating: 4.7,
        category: 'Sports Drink'
      },
      {
        id: 4,
        name: 'Ginger-Lemon Immunity Spark',
        description: 'Ginger, turmeric, and lemon with green coffee bean for a wellness-focused energy boost.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        rating: 4.6,
        category: 'Energy Drink'
      },
      {
        id: 5,
        name: 'Calm Focus Chill',
        description: 'Rooibos-chamomile blend with L-theanine and bacopa for low-stim clarity and focus.',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
        rating: 4.5,
        category: 'Wellness Drink'
      }
    ],
    equipment: [
      {
        id: 6,
        name: 'Premium Protein Shaker',
        description: 'Leak-proof shaker bottle with mixing ball and measurement markings.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop',
        rating: 4.8,
        category: 'Accessories'
      },
      {
        id: 7,
        name: 'Resistance Bands Set',
        description: 'Complete set of 5 resistance bands for full-body workouts.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        rating: 4.9,
        category: 'Training'
      },
      {
        id: 8,
        name: 'Adjustable Dumbbells',
        description: 'Space-saving adjustable dumbbells with quick-change system.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
        rating: 4.7,
        category: 'Weights'
      }
    ],
    sportswear: [
      {
        id: 9,
        name: 'Performance Training Tee',
        description: 'Moisture-wicking athletic shirt with antimicrobial treatment.',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 4.6,
        category: 'Tops'
      },
      {
        id: 10,
        name: 'Compression Leggings',
        description: 'High-performance compression leggings with phone pocket.',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1506629905773-0b6b7d10dbf3?w=300&h=300&fit=crop',
        rating: 4.8,
        category: 'Bottoms'
      },
      {
        id: 11,
        name: 'Athletic Hoodie',
        description: 'Lightweight hoodie perfect for pre and post-workout comfort.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
        rating: 4.7,
        category: 'Outerwear'
      }
    ]
  };

  const addToCart = (product) => {
    setCartItemsCount(prev => prev + 1);
    setGuestCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handlePaymentSuccess = (order) => {
    setOrderDetails(order);
    alert("Order placed successfully!");
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  // Mock payment form component
  const PaymentForm = ({ userId, guestCart, onPaymentSuccess }) => {
    const [paymentData, setPaymentData] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const mockOrder = {
        orderId: 'ORD-' + Date.now(),
        userId: userId,
        items: guestCart,
        total: guestCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };
      onPaymentSuccess(mockOrder);
    };

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold mb-6 flex items-center text-black">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              value={paymentData.cardholderName}
              onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            Complete Payment
          </button>
        </form>
      </div>
    );
  };

  // Mock guest checkout component
  const GuestCheckout = ({ setGuestCart }) => {
    const [guestInfo, setGuestInfo] = useState({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    });

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center text-black">
          <User className="mr-2 h-5 w-5" />
          Guest Information
        </h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={guestInfo.firstName}
                onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={guestInfo.lastName}
                onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mail className="mr-1 h-4 w-4" />
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              value={guestInfo.email}
              onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Phone className="mr-1 h-4 w-4" />
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              value={guestInfo.phone}
              onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              value={guestInfo.address}
              onChange={(e) => setGuestInfo({...guestInfo, address: e.target.value})}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={guestInfo.city}
                onChange={(e) => setGuestInfo({...guestInfo, city: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                value={guestInfo.zipCode}
                onChange={(e) => setGuestInfo({...guestInfo, zipCode: e.target.value})}
                required
              />
            </div>
          </div>
        </form>

        {/* Cart Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3 text-black">Order Summary</h4>
          {guestCart.length > 0 ? (
            <>
              {guestCart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-700">{item.name} x {item.quantity}</span>
                  <span className="font-medium text-black">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-black">Total:</span>
                  <span className="text-black">${guestCart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No items in cart</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
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

      {/* Header with Logo and Actions */}
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
                onClick={() => setShowCheckout(!showCheckout)}
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

{/* Video Hero Section */}
<section className="relative bg-black overflow-hidden">
  <div className="relative h-96 md:h-[500px] lg:h-[600px]">
    {/* Video Background */}
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover"
      src="/y2mate--So-Win-Nike_1080.mp4"
    />

    {/* Optional overlay for dimming */}
    <div className="absolute inset-0 bg-black opacity-40"></div>
    
    {/* Video Overlay Content */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fuel Your <span className="text-gray-300">Potential</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
          Premium energy drinks, professional equipment, and performance sportswear for athletes who demand excellence.
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105">
          Shop Now
        </button>
      </div>
    </div>

    {/* Video Status Indicator */}
    {isVideoPlaying && (
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        ● Playing
      </div>
    )}
  </div>
</section>

      {/* Products Section */}
      {!showCheckout && (
        <>
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600">Premium quality products for peak performance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products[activeCategory].map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all transform hover:scale-105 border border-gray-200">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
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
                          onClick={() => addToCart(product)}
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Free Shipping</h3>
                  <p className="text-gray-600">Free shipping on orders over $75</p>
                </div>
                
                <div className="text-center bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Quality Guarantee</h3>
                  <p className="text-gray-600">100% satisfaction guaranteed</p>
                </div>
                
                <div className="text-center bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">Easy Returns</h3>
                  <p className="text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Checkout Section */}
      {showCheckout && (
        <section className="py-12 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-black">Checkout</h2>
              <button 
                onClick={() => setShowCheckout(false)}
                className="text-gray-600 hover:text-black font-medium transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Show GuestCheckout only if not logged in */}
            {!userId && (
              <div className="mb-8">
                <GuestCheckout setGuestCart={setGuestCart} />
              </div>
            )}

            {/* PaymentForm for both guest and logged-in users */}
            <div className="mb-8">
              <PaymentForm 
                userId={userId} 
                guestCart={guestCart} 
                onPaymentSuccess={handlePaymentSuccess} 
              />
            </div>

            {/* Display order details after successful payment */}
            {orderDetails && (
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-black">Order Confirmation</h3>
                <div className="bg-gray-50 p-4 rounded border">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-800">
                    {JSON.stringify(orderDetails, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6" />
                <span className="text-xl font-bold">PureBoost Energy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premium energy solutions for peak performance athletes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Energy Drinks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports Equipment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sportswear</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PureBoost Energy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PureBoostEcommerce;