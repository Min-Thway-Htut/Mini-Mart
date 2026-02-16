import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage: React.FC = () => {

  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-green-100 flex flex-col md:flex-row items-center justify-between p-8 md:p-20">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4">
            Fresh Food, Drinks & Snacks Delivered!
          </h2>
          <p className="mb-6">
            Shop from our mini-mart and get the best deals on food, drinks, and
            snacks
          </p>
          <button 
           onClick={() => navigate("/products")} 
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="src/images/logo.png"
            alt="MiniMart"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
      </section>

      <section id="products" className="p-8 md:p-20">
        <h3 className="text-3xl font-bold mb-8 text-center">Our Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="src/images/food.png"
              alt="Food Icon"
              className="mx-auto mb-4"
              style={{ width: "130px", height: "130px" }}
            />
            <h4 className="font-bold mb-2">Food</h4>
            <p>Fresh and healthy meals to satisfy your hunger.</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="src/images/drink.png"
              alt="Drink Icon"
              className="mx-auto mb-4"
              style={{ width: "130px", height: "130px" }}
            />
            <h4 className="font-bold mb-2">Drinks</h4>
            <p>Refreshing beverages for every occasion.</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="src/images/snack.png"
              alt="Snack Icon"
              className="mx-auto mb-4"
              style={{ width: "130px", height: "130px" }}
            />
            <h4 className="font-bold mb-2">Snacks</h4>
            <p>Tasty snacks to munch anytime you like.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
