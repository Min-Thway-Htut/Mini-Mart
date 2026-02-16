import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/landingPage");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-600 text-white">
      <img src="src/images/logo.png" alt="Grab & Go Logo" className="mb-4 animate-bounce" style={{ width: "200px", height: "200px"}}/>
      <h1 className="text-4xl font-bold">Grab & Go</h1>
    </div>
  );
};

export default WelcomePage;
