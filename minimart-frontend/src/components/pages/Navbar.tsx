import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white p-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Grab & Go</h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex space-x-4">
          <a href="#products" className="hover:underline">
            Products
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>

      <div
        className={`
          ${isOpen ? "block" : "hidden"}
          md:hidden
          absolute top-full left-0 right-0
          bg-green-600
          p-4
          space-y-2
          shadow-lg
        `}
      >
        <a href="#products" className="hover:underline block py-2">
          Products
        </a>
        <a href="#about" className="hover:underline block py-2">
          About
        </a>
        <a href="#contact" className="hover:underline block py-2">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
