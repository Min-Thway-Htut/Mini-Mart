import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Product } from "../types";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="p-8 text-center">Loading product...</p>;
  }

  return (
    <div className="min-h-screen p-8 md:p-20 bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded shadow flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="rounded w-full md:w-1/2"
          style={{width: "150px", height: "150px"}}
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-green-600 font-semibold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-4">{product.description}</p>
          <p className="text-gray-700">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
