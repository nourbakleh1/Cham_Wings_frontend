import React from "react";
import {
  FaCheck,
  FaLock,
  FaSuitcase,
  FaUtensils,
  FaMedal,
} from "react-icons/fa";
import ".././style.css"

const ClassDetails = ({ classType, expandedClass, onSelect }) => {
  if (!expandedClass) return null;

  const classInfo = classType.find(
    (c) => c.name.toLowerCase() === expandedClass
  );

  const iconMap = {
    weight: FaSuitcase,
    meal: FaUtensils,
    miles: FaMedal,
  };

  const buttonClass =
    classInfo.color === "green" ? "btn-economy" : "btn-business";

  return (
    <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md w-full">
      <h3 className={`text-xl font-bold mb-4 text-${classInfo.color}-600`}>
        {classInfo.name} Class Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(classInfo).map(([key, value]) => {
          if (["name", "color", "price"].includes(key)) return null;
          let Icon = iconMap[key] || FaCheck;

          if (
            classInfo.name === "Economy" &&
            (key === "changeFee" || key === "refundFee")
          ) {
            Icon = FaLock;
          }

          return (
            <div
              key={key}
              className="flex items-center bg-white p-3 rounded-md shadow-sm"
            >
              <Icon className={`text-${classInfo.color}-600 mr-3 text-xl`} />
              <div>
                <p className="font-semibold text-gray-700 capitalize">{key}</p>
                <p className="text-sm text-gray-600">
                  {key === "miles" ? `${value} Eligible Miles` : value}
                </p>
              </div>
            </div>
          );
        })}
        <div className="flex items-center bg-white p-3 rounded-md shadow-sm">
          <FaLock className="text-gray-400 mr-3 text-xl" />
          <div>
            <p className="font-semibold text-gray-700">Restricted</p>
            <p className="text-sm text-gray-600">Some restrictions apply</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSelect(expandedClass)}
        className={`mt-4 ${buttonClass} py-2 px-4 rounded-md shadow-sm`}
      >
        Select
      </button>
      <p className="mt-4 text-sm text-gray-500 text-center">
        *Additional terms and conditions may apply
      </p>
    </div>
  );
};

export default ClassDetails;
