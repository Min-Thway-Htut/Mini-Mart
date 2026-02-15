import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 text-white p-6 text-center">
      &copy; {new Date().getFullYear()} Grab & Go. All rights reserved.
    </footer>
  );
};

export default Footer;
