import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function PaymentForm({ onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cartItems, setCartItems] = useState([
    // Example fixed cart items — replace with your actual cart data
    { id: 1, name: "Energy Drink", price: 3.99, quantity: 2 },
    { id: 2, name: "Water Bottle", price: 1.5, quantity: 1 },
  ]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setStatus("Processing payment...");

    try {
      const res = await fetch(`${API}/orders/process-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          cartItems,
          paymentDetails: { method: paymentMethod },
          // Optionally pass guestInfo if available (from cookies or app state)
          // guestInfo: { email: "guest@example.com", cartId: 123 },
          // Or userId if logged in
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setStatus(`Payment failed: ${errData.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setStatus("Payment successful! Order created.");
      setLoading(false);
      if (onPaymentSuccess) onPaymentSuccess(data.order);
    } catch (error) {
      setStatus("Payment error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Cart summary:</p>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <p>
        Total: $
        {cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>

      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Crypto</option>
        </select>
      </label>

      <br />

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <p>{status}</p>
    </div>
  );
}

export default PaymentForm;
