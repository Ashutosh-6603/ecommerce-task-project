import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import CartItem from "./CartItem";
import CheckoutModal from "./CheckoutModal";

export default function CartPage() {
  const { items, totalAmount, totalItems } = useSelector(
    (state: RootState) => state.cart
  );
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({totalItems})</span>
                <span className="text-gray-900">₹{totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">₹0.00</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">
                  ₹{(totalAmount * 0.1).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{(totalAmount * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutModal(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {showCheckoutModal && (
        <CheckoutModal onClose={() => setShowCheckoutModal(false)} />
      )}
    </div>
  );
}
