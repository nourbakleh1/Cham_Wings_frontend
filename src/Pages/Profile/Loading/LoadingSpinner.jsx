import React from "react";

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-10 w-10 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4zm8 0a8 8 0 01-8-8h8v8z"
    ></path>
  </svg>
);

export default LoadingSpinner;
