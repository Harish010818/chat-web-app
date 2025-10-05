import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    const text = document.querySelector(".wave-text");
    const letters = text.textContent.split("");
    text.textContent = "";

    letters.forEach((letter, i) => {
      const span = document.createElement("span");

      if (letter === " ") {
        span.innerHTML = "&nbsp;"; // keeps spacing
        span.style.display = "inline-block";
        span.style.width = "0.5em";
        span.style.opacity = 0; // invisible but keeps gap
      } else {
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.1}s`;
      }

      text.appendChild(span);
    });
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-blue-500 overflow-hidden px-6 font-sans">

      {/* Floating background blobs for style */}
      <div className="absolute w-72 h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl bottom-0 left-130 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl top-10 left-260 animate-pulse"></div>

      {/* Wave text animation */}
      <h1 className="wave-text text-4xl md:text-5xl font-bold mb-4 text-white tracking-wide">
        Welcome to the Chat App!
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg mb-8 text-gray-200 max-w-md leading-relaxed">
        Chat in real-time with your friends. Smooth. Fast. Fun. 🚀
      </p>

      {/* Buttons */}
      <Link
        to="/home"
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer z-10"
      >
        Let's Get Started!
      </Link>


      <div className="absolute top-4 right-4">
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/login"
            className="bg-[var(--homepage-white)] text-[var(--rich-black)] font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[var(--homepage-white)] text-[var(--rich-black)] font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
