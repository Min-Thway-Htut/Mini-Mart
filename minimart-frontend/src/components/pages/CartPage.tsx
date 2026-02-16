import React from "react";
import { useCart } from "../../cartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, addToCart, decrease, remove, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-20 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded shadow flex flex-col items-center"
          >
            <img
              src={`http://127.0.0.1:8000${item.product_image}`}
              alt={item.product_name}
              className="w-32 h-32 object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-xl mb-2">{item.product_name}</h3>
            <p className="text-green-600 font-semibold mb-2">
                ${Number(item.product_price).toFixed(2)}
            </p>

            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => decrease(item.product)}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                -
              </button>

              <span className="px-3 py-1 border rounded">
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart(item.product)}
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={() => remove(item.product)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-2xl font-bold">
          Total: ${totalPrice.toFixed(2)}
        </h3>

        <div className="mt-4 md:mt-0 flex space-x-4">
          <button
            onClick={() => clearCart()}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Clear Cart
          </button>

          <button
            onClick={() => alert("Proceed to checkout")}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
