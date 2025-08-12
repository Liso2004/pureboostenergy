import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

function GuestCheckout() {
  const [guestEmail, setGuestEmail] = useState("");
  const [cartId, setCartId] = useState("");
  const [status, setStatus] = useState("");

  // Load cookie data on mount
  useEffect(() => {
    fetch(`${API}/get-cookie/guestCheckoutInfo`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No guest cookie");
        return res.text();
      })
      .then((text) => {
        // Response format: "Cookie Value: {JSON}"
        const jsonStr = text.replace("Cookie Value: ", "");
        const data = JSON.parse(jsonStr);
        if (data.email) setGuestEmail(data.email);
        if (data.cartId) setCartId(data.cartId);
      })
      .catch(() => setStatus("No saved guest info"));
  }, []);

  // Save cookie on form submit
  const saveGuestInfo = () => {
    const value = JSON.stringify({ email: guestEmail, cartId });
    fetch(`${API}/set-cookie`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "guestCheckoutInfo", value }),
    })
      .then((res) => res.json())
      .then(() => setStatus("Guest info saved!"))
      .catch(() => setStatus("Failed to save guest info"));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveGuestInfo();
        // Continue payment process...
      }}
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
      <button type="submit">Save & Continue</button>
      <p>{status}</p>
    </form>
  );
}

export default GuestCheckout;
