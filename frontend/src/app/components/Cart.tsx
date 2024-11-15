import { useEffect, useState } from "react";
import { Product } from "../page";

const Cart = ({ reload }: { reload: boolean }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const hasCart = cart && cart.length > 0;

  useEffect(() => {
    const sessionCart = sessionStorage.getItem("cart");

    if (sessionCart) {
      const parsedCart = JSON.parse(sessionCart);

      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      }
    }
  }, [reload]);

  return (
    <div className="flex items-center justify-between p-4 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm gap-4">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold">Shopping Cart</h3>
        <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">
          {hasCart ? cart.length : "-"} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-4 rounded-md flex items-center gap-2"
        onClick={() => {
          sessionStorage.removeItem("cart");
          setCart([]);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
