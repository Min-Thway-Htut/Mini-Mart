import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cartContext";
import { useAuth } from "../../authContext";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const navigate = useNavigate();
  const { cart, addToCart, decrease } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get("https://backend-v80n.onrender.com/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

   const handleAddToCart = (productId: number) => {
    if (!token) {
      alert("Please log in or register to add items to the cart.");
      navigate("/login");
      return;
    }
    addToCart(productId);
  };

  const handleDecrease = (productId: number) => {
    if (!token) {
      alert("Please log in or register to modify your cart.");
      navigate("/login");
      return;
    }
    decrease(productId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    return matchesName && matchesCategory;
  });

  const categories = ["All", "Food", "Drinks", "Snacks"];

  const getQuantity = (productId: number) => {
    const item = cart.find((i) => i.product === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen p-8 md:p-20 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      <div className="flex flex-col items-center mb-4 md:mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded border transition ${
                categoryFilter === category
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto mb-4 rounded cursor-pointer"
              style={{ width: "150px", height: "150px" }}
              onClick={() => handleClick(product)}
            />

            <h3
              className="font-bold text-xl mb-2 cursor-pointer"
              onClick={() => handleClick(product)}
            >
              {product.name}
            </h3>

            <p className="text-green-600 font-semibold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4">{product.category}</p>

            <div className="flex items-center justify-center space-x-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrease(product.id);
                }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                -
              </button>
              <span className="px-4 py-1 border rounded">
                {getQuantity(product.id)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product.id);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product.id);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
