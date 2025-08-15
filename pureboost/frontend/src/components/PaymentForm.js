import React, { useState, useEffect } from "react";

function PaymentForm({ userId, guestCart, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Update cartItems whenever userId or guestCart changes
  useEffect(() => {
    if (userId) {
      // TODO: fetch cart for logged-in user from backend
      // Example: setCartItems(fetchedUserCart)
    } else if (guestCart) {
      setCartItems(guestCart);
    }
  }, [userId, guestCart]);

  const handlePayment = async () => {
    if (!cartItems.length) {
      setStatus("Cart is empty!");
      return;
    }

    setLoading(true);
    setStatus("Processing payment...");

    try {
      // Simulate API call (replace with real API in future)
      const order = {
        userId: userId || null,
        items: cartItems,
        total: cartItems.reduce(
          (sum, item) => sum + (parseFloat(item.item_total) || parseFloat(item.price) * item.quantity),
          0
        ),
        paymentMethod,
      };

      // Call parent callback
      onPaymentSuccess && onPaymentSuccess(order);

      setStatus("Payment successful! Order created.");
      setCartItems([]);
      setLoading(false);
    } catch (err) {
      setStatus("Payment error: " + err.message);
      setLoading(false);
    }
  };

  const lineTotal = (item) =>
    parseFloat(item.item_total ?? (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)) || 0;

  const grandTotal = cartItems.reduce((sum, item) => sum + lineTotal(item), 0);

  return (
    <div>
      <h2>Payment</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.cart_item_id || item.id || `${item.product_id}-${item.cart_id}`}>
                {item.product_name || item.name} × {item.quantity} — ${lineTotal(item).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total: ${grandTotal.toFixed(2)}</p>
        </>
      )}

      <label>
        Payment Method:{" "}
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Crypto</option>
        </select>
      </label>

      <br />

      <button onClick={handlePayment} disabled={loading || !cartItems.length}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <p>{status}</p>
    </div>
  );
}

export default PaymentForm;
