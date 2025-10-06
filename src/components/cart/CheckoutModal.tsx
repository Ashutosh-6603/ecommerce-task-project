import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { clearCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmCheckout = async () => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(clearCart());

      toast.success(
        "🎉 Order placed successfully! Redirecting to products...",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      onClose();

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error: unknown) {
      toast.error("❌ Failed to process order. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Confirm Checkout
          </h3>

          <p className="text-gray-600 mb-4">
            You are about to purchase {items.length} item(s) for a total of
            <span className="font-semibold">
              {" "}
              ₹{(totalAmount * 1.1).toFixed(2)}
            </span>
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-40 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Order Summary:
            </h4>
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center text-sm mb-1"
              >
                <span className="text-gray-600 truncate flex-1 mr-2">
                  {item.product.title}
                </span>
                <span className="text-gray-900 font-medium whitespace-nowrap">
                  {item.quantity} × ₹{item.product.price}
                </span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%):</span>
                <span>₹{(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 mt-1">
                <span>Total:</span>
                <span>₹{(totalAmount * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmCheckout}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
