import React from "react";

const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-black">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4"
      >
        <div>{label}</div>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
