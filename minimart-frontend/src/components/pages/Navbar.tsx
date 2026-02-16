import React, { useState } from "react";
import { useCart } from "../../cartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Grab & Go
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/products")}>Products</button>

          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="relative">
            <img
              src="/src/images/cart-icon.png"
              alt="Cart"
              className="w-6 h-6"
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Auth */}
          {token ? (
            <button
              onClick={logout}
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 px-3 py-1 rounded"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <button
            className="block w-full text-left"
            onClick={() => navigate("/products")}
          >
            Products
          </button>

          <button
            className="block w-full text-left"
            onClick={() => navigate("/cart")}
          >
            Cart ({totalItems})
          </button>

          {token ? (
            <button
              className="block w-full text-left"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="block w-full text-left"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
