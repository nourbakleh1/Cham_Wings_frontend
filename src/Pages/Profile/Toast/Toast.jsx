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

  const toastStyles = {
    position: "fixed",
    top: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    backgroundColor: type === "success" ? "#10b957" : "#EF4444",
    width: "50vw",
    maxWidth: "500px",
    zIndex: 9999,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "16px",
    margin: "0 auto",
    transition: "opacity 0.3s ease-in-out",
    opacity: isVisible ? 1 : 0,
  };

  return <div style={toastStyles}>{message}</div>;
};

export default Toast;
