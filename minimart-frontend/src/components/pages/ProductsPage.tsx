import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/products/')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 md:p-20 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>

    <div className="flex justify-center mb-8">
          <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => handleClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto mb-4 rounded"
              style={{width: "150px", height: "150px"}}
            />
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-green-600 font-semibold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700">{product.category}</p>
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
