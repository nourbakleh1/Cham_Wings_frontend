import React, { useState } from "react";
import PropTypes from "prop-types";

const PassportImageUpload = ({
  imagePreview,
  passportImage,
  onFileChange,
  onRemoveImage,
  isDisabled,
  error,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-800 mb-2">
        Passport Image
      </label>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          disabled={isDisabled}
          className="block w-full text-sm text-gray-500 file:border-0 file:bg-gray-100 file:rounded-lg file:text-sm file:font-medium file:py-2 file:px-4 file:text-blue-700 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={onRemoveImage}
          disabled={!imagePreview}
          className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded-full shadow-sm hover:bg-gray-200"
          aria-label="Remove Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Selected Preview"
            className="w-36 h-36 rounded-full shadow-2xl object-cover border-4 border-white group-hover:border-blue-500 transition duration-300 ease-in-out"
          />
        ) : passportImage ? (
          <img
            src={`http://127.0.0.1:8000/${passportImage}`}
            alt="Passport"
            className="w-36 h-36 rounded-full shadow-2xl object-cover border-4 border-white group-hover:border-blue-500 transition duration-300 ease-in-out"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            Add Photo
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

PassportImageUpload.propTypes = {
  imagePreview: PropTypes.string,
  passportImage: PropTypes.string,
  onFileChange: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PassportImageUpload;
