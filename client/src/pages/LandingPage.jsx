import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-[var(--office-blue)] px-4">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 tracking-wide">
            Welcome! to the Chat App
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-200 max-w-md">
            Please login to start messaging and enjoy real-time conversations...
          </p>
          <button
            className="bg-white text-[var(--office-blue)] text-xl font-medium px-6 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-[var(--homepage-white)] hover:scale-110 hover:shadow-lg"
          >
          <Link to="/login">Login</Link>  
          </button>
        </div>
      )
};

export default LandingPage;
