import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// GuestCheckout component
function GuestCheckout({ onSaved, onGuestInfoChange }) {
  const [guestEmail, setGuestEmail] = useState("");
  const [cartId, setCartId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Load cookie data on mount
  useEffect(() => {
    fetch(`${API}/get-cookie/guestCheckoutInfo`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No guest cookie");
        return res.text();
      })
      .then((text) => {
        const jsonStr = text.replace("Cookie Value: ", "");
        const data = JSON.parse(jsonStr);
        if (data.email) setGuestEmail(data.email);
        if (data.cartId) setCartId(data.cartId);
        setStatus("Loaded guest info");
        if (onGuestInfoChange) onGuestInfoChange(data);
      })
      .catch(() => setStatus("No saved guest info"));
  }, [onGuestInfoChange]);

  // Save cookie on form submit
  const saveGuestInfo = () => {
    setLoading(true);
    const value = JSON.stringify({ email: guestEmail, cartId });
    fetch(`${API}/set-cookie`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "guestCheckoutInfo", value }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then(() => {
        setStatus("Guest info saved!");
        if (onSaved) onSaved();
        if (onGuestInfoChange) onGuestInfoChange({ email: guestEmail, cartId });
      })
      .catch(() => setStatus("Failed to save guest info"))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveGuestInfo();
      }}
      style={{ marginBottom: 20 }}
    >
      <label>
        Email:{" "}
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Cart ID:{" "}
        <input
          type="text"
          value={cartId}
          onChange={(e) => setCartId(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save & Continue"}
      </button>
      <p>{status}</p>
    </form>
  );
}

// PaymentForm component
function PaymentForm({ guestInfo, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cartItems, setCartItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch cart items when guestInfo.cartId changes
  useEffect(() => {
    if (!guestInfo.cartId) return;

    setStatus("Loading cart items...");
    fetch(`${API}/cart/${guestInfo.cartId}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart items");
        return res.json();
      })
      .then((data) => {
        setCartItems(data.cartItems || []);
        setStatus("Cart items loaded");
      })
      .catch((err) => {
        setStatus("Error loading cart: " + err.message);
      });
  }, [guestInfo.cartId]);

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
          guestInfo, // pass guest info for backend
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
    <div style={{ marginTop: 30 }}>
      <h2>Payment</h2>
      <p>Cart summary:</p>
      {cartItems.length === 0 && <p>No items in cart.</p>}
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
        Payment Method:{" "}
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

      <button onClick={handlePayment} disabled={loading || cartItems.length === 0}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <p>{status}</p>
    </div>
  );
}

// Main App component
function App() {
  const [status, setStatus] = useState("Ready");
  const [lastResponse, setLastResponse] = useState("");
  const [cookieName, setCookieName] = useState("guestCheckoutInfo");
  const [cookieValue, setCookieValue] = useState(
    JSON.stringify({ email: "guest@example.com", cartId: 123 }, null, 2)
  );
  const [guestInfo, setGuestInfo] = useState({ email: "", cartId: "" });

  async function callEndpoint(path, method = "GET", body = null) {
    setStatus(`Calling ${path}...`);
    setLastResponse("");
    try {
      const res = await fetch(`${API}${path}`, {
        method,
        credentials: "include", // send/receive cookies
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });

      const text = await res.text();
      setLastResponse(text);
      setStatus(`OK ${res.status}`);
    } catch (err) {
      setStatus("Error");
      setLastResponse(err.message || String(err));
    }
  }

  async function callProcessPayment() {
    setStatus(`Calling /orders/process-payment...`);
    setLastResponse("");
    try {
      const res = await fetch(`${API}/orders/process-payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setLastResponse(JSON.stringify(data, null, 2));
      setStatus(`OK ${res.status}`);
    } catch (err) {
      setStatus("Error");
      setLastResponse(err.message || String(err));
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.h1}>🍪 Guest Checkout & Cookie Test — PureBoostEnergy</h1>

        {/* GuestCheckout form */}
        <GuestCheckout
          onSaved={() => callEndpoint("/get-cookie/guestCheckoutInfo")}
          onGuestInfoChange={setGuestInfo}
        />

        {/* Payment form with guest info */}
        <PaymentForm
          guestInfo={guestInfo}
          onPaymentSuccess={(order) => {
            setStatus("Order placed successfully!");
            setLastResponse(JSON.stringify(order, null, 2));
          }}
        />

        {/* Manual cookie controls */}
        <div style={{ marginTop: 30, marginBottom: 12 }}>
          <label>
            Cookie Name:{" "}
            <input
              type="text"
              value={cookieName}
              onChange={(e) => setCookieName(e.target.value)}
              style={{ width: 200 }}
            />
          </label>
          <br />
          <label>
            Cookie Value (JSON):{" "}
            <textarea
              rows={3}
              value={cookieValue}
              onChange={(e) => setCookieValue(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div style={styles.row}>
          <button
            style={styles.btn}
            onClick={() =>
              callEndpoint("/set-cookie", "POST", {
                name: cookieName,
                value: cookieValue,
              })
            }
          >
            Set cookie
          </button>

          <button
            style={styles.btn}
            onClick={() => callEndpoint(`/get-cookie/${cookieName}`)}
          >
            Get cookie
          </button>

          <button
            style={styles.danger}
            onClick={() => callEndpoint(`/clear-cookie/${cookieName}`, "POST")}
          >
            Clear cookie
          </button>

          <button style={styles.btn} onClick={callProcessPayment}>
            Process Payment (Test)
          </button>
        </div>

        <div style={styles.info}>
          <div>
            <strong>API base:</strong> {API}
          </div>
          <div>
            <strong>Status:</strong> {status}
          </div>
        </div>

        <div style={styles.responseBox}>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {lastResponse || "No response yet"}
          </pre>
        </div>

        <p style={styles.small}>
          Tips: open Developer Tools → Application → Cookies to inspect cookies set
          by <code>{API}</code>.
        </p>

        <p style={styles.small}>
          If you get a CORS or credential issue, make sure your backend uses{" "}
          <code>credentials: true</code> and the correct <code>origin</code> in cors.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f4f6",
    padding: 20,
    fontFamily: "Inter, Roboto, system-ui, -apple-system, sans-serif",
  },
  card: {
    width: 720,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  h1: { margin: 0, marginBottom: 12, fontSize: 22 },
  row: { display: "flex", gap: 12, marginBottom: 16 },
  btn: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },
  danger: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #f2a7a7",
    background: "#fff6f6",
    cursor: "pointer",
  },
  info: { marginBottom: 12, color: "#333", display: "flex", gap: 12, flexWrap: "wrap" },
  responseBox: {
    background: "#0f172a0a",
    padding: 12,
    borderRadius: 8,
    minHeight: 60,
    marginBottom: 8,
  },
  small: { color: "#555", fontSize: 13 },
};

export default App;
