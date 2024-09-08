import React from "react";

const Toast = ({ message, type }) => {
  const toastClass = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed bottom-5 right-5 p-3 rounded-md text-white ${toastClass}`}
    >
      {message}
    </div>
  );
};

export default Toast;
