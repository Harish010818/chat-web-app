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
        span.innerHTML = "&nbsp;";
        span.style.display = "inline-block";
        span.style.width = "0.5em";
        span.style.opacity = 0;
      } else {
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.1}s`;
      }

      text.appendChild(span);
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-blue-500 overflow-hidden px-4 sm:px-6 md:px-8 font-sans">
      {/* Floating background blobs for style */}
      <div className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl top-6 left-6 animate-pulse"></div>
      <div className="absolute w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl bottom-0 animate-pulse"></div>
      <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[var(--homepage-white)] opacity-20 rounded-full blur-3xl top-12 right-12 animate-pulse"></div>

      {/* Wave text animation */}
      <h1 className="wave-text text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white tracking-wide leading-snug">
        Welcome to the Chat App!
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-200 max-w-xs sm:max-w-md leading-relaxed px-2">
        Chat in real-time with your friends. Smooth. Fast. Fun. 🚀
      </p>

      {/* Buttons */}
      <Link
        to="/home"
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer z-10 text-sm sm:text-base"
      >
        Let's Get Started!
      </Link>

      {/* Top-right buttons */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
        <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
          <Link
            to="/login"
            className="bg-[var(--homepage-white)] text-[var(--rich-black)] font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[var(--homepage-white)] text-[var(--rich-black)] font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
