import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number) => void;
  decrease: (productId: number) => void;
  remove: (productId: number) => void;
  fetchCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchCart = () => {
    if (!token) return;
    axios.get("http://127.0.0.1:8000/api/cart/", authHeader)
      .then(res => setCart(res.data))
      .catch(() => setCart([]));
  };

  const addToCart = (productId: number) => {
    axios.post("http://127.0.0.1:8000/api/cart/add/", { product_id: productId }, authHeader)
      .then(fetchCart);
  };

  const decrease = (productId: number) => {
    axios.post("http://127.0.0.1:8000/api/cart/decrease/", { product_id: productId }, authHeader)
      .then(fetchCart);
  };

  const remove = (productId: number) => {
    axios.delete(`http://127.0.0.1:8000/api/cart/remove/${productId}/`, authHeader)
      .then(fetchCart);
  };

  const clearCart = () => {
  axios.delete("http://127.0.0.1:8000/api/cart/clear/", authHeader)
    .then(fetchCart)
    .catch(err => console.error("Failed to clear cart:", err));
};

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, addToCart, decrease, remove, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
