    import React from 'react';

function OrderConfirmation({ orderDetails }) {
  return (
    <div>
      <h3>Order Confirmed</h3>
      <p>Order ID: {orderDetails.id}</p>
    </div>
  );
}

export default OrderConfirmation;
