import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputComponent = ({ label, value, onChange, disabled, error }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handlePhoneChange = (phone) => {
    if (!disabled) {
      onChange(phone);
    }
  };

  return (
    <div className="mb-6">
      <label className="block pb-5 text-sm font-medium text-black">
        {label}
      </label>
      <PhoneInput
        country={"sy"}
        value={internalValue}
        onChange={handlePhoneChange}
        containerStyle={{ marginTop: "4px", width: "100%" }}
        inputStyle={{ width: "100%" }}
        inputProps={{
          disabled: disabled,
        }}
        className={` ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInputComponent;
