import React from "react";

const Card = ({ icon, title, value, unit, status, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md w-64 text-center`} style={{ backgroundColor: bgColor }}>
      <div className="flex justify-center mb-4">
        <img src={icon} alt={title} className="w-16 h-16" />
      </div>
      <h3 className="text-gray-500 text-lg mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-1">
        {value} <span className="text-xl">{unit}</span>
      </p>
      <p className="text-gray-600">{status}</p>
    </div>
  );
};

export default Card;
