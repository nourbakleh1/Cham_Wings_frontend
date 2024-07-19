import React from "react";
import DatePicker from "react-datepicker";

const DateInput = ({ label, selected, onChange, disabled, type, minDate, error }) => {
  const today = new Date();

  return (
    <div className="mb-6 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={selected ? new Date(selected) : null}
        onChange={onChange}
        placeholderText={label}
        className={`mt-1 block w-full border-b-2 outline-none bg-white rounded-md border-secoundary_color focus:border-indigo-500 focus:ring-0 sm:text-sm p-4 bg-transparent ${
          disabled ? "cursor-auto" : ""
        }`}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        dateFormat="yyyy-MM-dd"
        maxDate={type === "dateOfBirth" ? today : undefined}
        minDate={minDate ? new Date(minDate) : null}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
