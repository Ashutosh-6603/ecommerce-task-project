import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { clearCart } from "../../store/cartSlice";

interface CheckoutModalProps {
  onClose: () => void;
}

interface CheckoutFormInputs {
  email: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const dispatch = useDispatch();
  const { totalAmount } = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormInputs>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: CheckoutFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(clearCart());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Checkout Information
            </h3>
            <p className="text-gray-600 text-sm">
              Total: ₹{(totalAmount * 1.1).toFixed(2)}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
