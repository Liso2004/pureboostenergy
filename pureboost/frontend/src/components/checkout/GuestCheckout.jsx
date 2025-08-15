import React, { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const GuestCheckout = ({ guestCart }) => {
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
        {/* Form fields here - same as in original */}
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
                <span className="text-black">
                  ${guestCart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </span>
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

export default GuestCheckout;