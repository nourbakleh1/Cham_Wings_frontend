import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  label,
  selected,
  onChange,
  disabled,
  type,
  minDate,
  error,
}) => {
  // Define today's date once, for use in maxDate
  const today = new Date();

  // Handle minDate and selected validation
  const minDateValue = minDate ? new Date(minDate) : null;
  const selectedDate = selected ? new Date(selected) : null;

  // Helper function to check if a value is a valid Date
  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  return (
    <div className="mb-6 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={isValidDate(selectedDate) ? selectedDate : null}
        onChange={onChange}
        placeholderText={label}
        className={`mt-1 block w-full border-b-2 outline-none bg-white rounded-md border-secondary_color focus:border-indigo-500 focus:ring-0 sm:text-sm p-4 ${
          disabled ? "bg-gray-200 cursor-not-allowed" : "bg-transparent"
        }`}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        dateFormat="yyyy-MM-dd"
        maxDate={type === "dateOfBirth" ? today : undefined}
        minDate={isValidDate(minDateValue) ? minDateValue : null}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;
