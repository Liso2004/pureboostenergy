import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function OrderConfirmation({ orderDetails, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // auto close after 3 seconds
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg"
        >
          <h3 className="font-bold text-lg">✅ Added to Cart</h3>
          <p>Order ID: {orderDetails.id}</p>
          <p className="text-sm">Your item has been added successfully!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrderConfirmation;
