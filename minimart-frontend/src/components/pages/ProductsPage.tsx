import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  return (
    <div className="min-h-screen p-8 md:p-20 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
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
      </div>
    </div>
  );
};

export default ProductsPage;
