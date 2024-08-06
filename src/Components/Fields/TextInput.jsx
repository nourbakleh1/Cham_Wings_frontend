import React from "react";

const TextInput = ({
  label,
  value,
  name,
  onChange,
  disabled,
  error,
  type = "text",
}) => {
  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-medium text-black">{label}</label>
      <div className="flex items-center">
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          disabled={disabled}
          placeholder={label}
          className={`block w-full px-3 py-2 mt-5 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
