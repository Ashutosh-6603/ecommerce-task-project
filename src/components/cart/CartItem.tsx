import { useDispatch } from "react-redux";
import type { CartItem as CartItemType } from "../../types";
import { updateQuantity, removeFromCart } from "../../store/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      dispatch(
        updateQuantity({ productId: item.product.id, quantity: newQuantity })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex items-center space-x-4">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-16 h-16 object-contain"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
          {item.product.title}
        </h3>
        <p className="text-gray-600">₹{item.product.price}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          ₹{(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-800 text-sm mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
