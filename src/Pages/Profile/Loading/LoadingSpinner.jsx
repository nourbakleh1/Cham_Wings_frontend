import React from "react";
import "./Loading.css";

const LoadingSpinner = () => (
  <div className="relative w-24 h-24">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-l-4 border-r-4 border-yellow-400 rounded-full animate-spin animate-pulse"></div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        className="w-12 h-12 text-gray-800 animate-bounce"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
      </svg>
    </div>
  </div>
);

export default LoadingSpinner;
