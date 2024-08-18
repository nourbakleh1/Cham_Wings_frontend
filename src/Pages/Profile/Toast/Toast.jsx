import React, { useEffect, useState } from "react";

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-14 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } max-w-[230px] w-full`}
      style={{ zIndex: 9999 }}
    >
      {message}
    </div>
  );
};

export default Toast;
