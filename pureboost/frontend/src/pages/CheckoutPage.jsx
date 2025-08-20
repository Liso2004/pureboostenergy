import { useState } from "react";
import { CreditCard, User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";

const Checkout = ({ cartItems = [], onBackToShopping, onPaymentSuccess }) => {
  const [guestInfo, setGuestInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const total = (cartItems || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const formatZAR = (amount) =>
    new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(amount);

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockOrder = {
      orderId: "ORD-" + Date.now(),
      items: cartItems,
      total,
      status: "confirmed",
      timestamp: new Date().toISOString(),
      customerInfo: guestInfo,
    };

    if (typeof onPaymentSuccess === "function") {
      onPaymentSuccess(mockOrder);
    }
  };

  return (
    <section className="py-12 bg-muted/50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Checkout</h2>
          {onBackToShopping && (
            <Button variant="ghost" onClick={onBackToShopping}>
              ← Continue Shopping
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guest Information */}
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-card-foreground">
              <User className="mr-2 h-5 w-5" />
              Customer Information
            </h3>
            <form className="space-y-4">
              {/* First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
                  <input
                    type="text"
                    value={guestInfo.firstName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
                  <input
                    type="text"
                    value={guestInfo.lastName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center">
                  <Mail className="mr-1 h-4 w-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={guestInfo.email}
                  onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center">
                  <Phone className="mr-1 h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={guestInfo.phone}
                  onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  Address
                </label>
                <input
                  type="text"
                  value={guestInfo.address}
                  onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  required
                />
              </div>

              {/* City + ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">City</label>
                  <input
                    type="text"
                    value={guestInfo.city}
                    onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={guestInfo.zipCode}
                    onChange={(e) => setGuestInfo({ ...guestInfo, zipCode: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment & Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h4 className="font-semibold mb-4 text-card-foreground">Order Summary</h4>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatZAR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-foreground">Total:</span>
                      <span className="text-foreground">{formatZAR(total)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">No items in cart</p>
              )}
            </div>

            {/* Payment Form */}
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-card-foreground">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardholderName: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Complete Payment - {formatZAR(total)}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
