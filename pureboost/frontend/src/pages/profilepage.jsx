import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [refundMessage, setRefundMessage] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
      setProfile(data);
      setFormData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
      setOrders(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setProfile(data.user);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle refund
  const handleRefund = async () => {
    if (!selectedOrder || selectedItems.length === 0 || !refundReason.trim()) {
      setError("Please select an order, choose items, and provide a reason.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/profile/refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: selectedOrder,
          items: selectedItems,
          reason: refundReason,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Refund failed");
      setRefundMessage(data.message);
      setRefundReason("");
      setSelectedOrder("");
      setSelectedItems([]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Track item selection
  const handleItemSelection = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  useEffect(() => {
    if (token) {
      Promise.all([fetchProfile(), fetchOrders()]).finally(() =>
        setLoading(false)
      );
    } else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        {editing ? (
          <div className="space-y-2">
            {["name", "surname", "username", "email", "contact_number"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="border rounded w-full p-2"
                />
              )
            )}
            <button
              onClick={handleUpdateProfile}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {profile.name} {profile.surname}
            </p>
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Contact:</strong> {profile.contact_number}
            </p>
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
            >
              Update Details
            </button>
          </>
        )}
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.order_id}
                className={`border rounded p-3 ${
                  selectedOrder === order.order_id ? "border-blue-500" : ""
                }`}
                onClick={() => setSelectedOrder(order.order_id)}
              >
                <p>
                  <strong>Order ID:</strong> {order.order_id}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total:</strong> ${order.total_amount}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.created_at).toLocaleString()}
                </p>

                {/* Ordered Items */}
                {order.items ? (
                  <div className="mt-2">
                    <p className="font-semibold">Ordered Items:</p>
                    <ul className="list-disc ml-5">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.product_name)}
                              onChange={() =>
                                handleItemSelection(item.product_name)
                              }
                            />
                            <span>
                              {item.product_name} (x{item.quantity})
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No item details available
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Refund Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Refund</h2>
        <textarea
          className="w-full border rounded p-2 mb-3"
          placeholder="Enter reason for refund..."
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
        />
        <button
          onClick={handleRefund}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Request Refund
        </button>
        {refundMessage && (
          <p className="text-green-600 mt-2">{refundMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
