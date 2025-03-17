import React from "react";

const Alert = ({ alert }) => {
  // No message? No alert
  if (!alert?.message || alert.message.trim().length === 0) {
    return null;
  }

  // Determine alert styles based on type
  let alertStyle = "";
  switch (alert.type) {
    case "success":
      alertStyle = "bg-green-500 border-green-700";
      break;
    case "warning":
      alertStyle = "bg-yellow-500 border-yellow-700";
      break;
    case "error":
      alertStyle = "bg-red-500 border-red-700";
      break;
    default:
      // default/fallback style
      alertStyle = "bg-gray-500 border-gray-700";
  }

  return (
    <p className={`${alertStyle} text-white my-4 p-2 border-l-4 text-sm`}>
      {alert.message}
    </p>
  );
};

export default Alert;
