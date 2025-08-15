import React from "react";
import GuestCheckout from "./GuestCheckout";
import PaymentForm from "./PaymentForm";

function Checkout({
  showCheckout,
  setShowCheckout,
  userId,
  guestCart,
  setGuestCart,
  handlePaymentSuccess,
  orderDetails
}) {
  if (!showCheckout) return null;

  return (
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
            <h3 className="text-xl font-semibold mb-4 text-black">
              Order Confirmation
            </h3>
            <div className="bg-gray-50 p-4 rounded border">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-800">
                {JSON.stringify(orderDetails, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;