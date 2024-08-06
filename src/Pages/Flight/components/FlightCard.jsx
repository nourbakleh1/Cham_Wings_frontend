import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectFlight } from "../../../Redux/ApiSlices/flightSlice";
import { FaPlane, FaChevronDown } from "react-icons/fa";
import ClassDetails from "./ClassDetails";

const FlightCard = ({ flight, isSelected, onSelect }) => {
  const [expandedClass, setExpandedClass] = useState(null);
  const dispatch = useDispatch();

  const handleClassSelect = (classType) => {
    setExpandedClass(expandedClass === classType ? null : classType);
  };

  const handleSelectButtonClick = (classType) => {
    dispatch(selectFlight({ flightId: flight.id, classType }));
    onSelect(flight, classType);
    setExpandedClass(null);
  };

  const classTypes = [
    {
      name: "Economy",
      color: "green",
      price: `SYP ${flight.economyPrice}`,
      weight: flight.economyWeight,
      meal: `Meal x${flight.economyMeals}`,
      cabinBaggage: flight.economyCabinBaggage,
      changeFee: flight.economyChangeFee,
      refundFee: flight.economyRefundFee,
    },
    {
      name: "Business",
      color: "blue",
      price: `SYP ${flight.businessPrice}`,
      weight: flight.businessWeight,
      meal: `Meal x${flight.businessMeals}`,
      cabinBaggage: flight.businessCabinBaggage,
      changeFee: flight.businessChangeFee,
      refundFee: flight.businessRefundFee,
    },
  ];

  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md mb-4 my-8 ${
        isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left section */}
        <div className="p-4 border-b lg:border-b-0 lg:border-r border-gray-400 lg:w-2/5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{flight.number}</span>
            <div>
              <span className="text-sm mr-2">{flight.aircraft}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <div className="font-bold text-xl">{flight.departureAirport}</div>
              <div className="text-gray-600">{flight.departureTime}</div>
            </div>
            <div className="text-center mb-2 sm:mb-0">
              <div className="text-gray-500 text-sm mb-1">
                {flight.duration}
              </div>
              <div className="flex items-center">
                <div className="h-px bg-gray-300 w-16"></div>
                <FaPlane className="text-gray-400 mx-2" />
                <div className="h-px bg-gray-300 w-16"></div>
              </div>
              <div className="text-center text-gray-500 mt-2">
                <div>{flight.date}</div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-xl">{flight.arrivalAirport}</div>
              <div className="text-gray-600">
                {flight.arrivalTime}
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {classTypes.map((classType) => (
              <div
                key={classType.name}
                className="relative border-b sm:border-b-0 sm:border-r last:border-r-0 border-gray-400"
              >
                <button
                  onClick={() =>
                    handleClassSelect(classType.name.toLowerCase())
                  }
                  className="w-full h-full p-4 text-left hover:bg-gray-100"
                >
                  <div
                    className={`font-semibold text-${classType.color}-700 border-t-${classType.color}-800`}
                  >
                    {classType.name}
                  </div>
                  <div className="text-sm text-gray-500">from SYP</div>
                  <div className="font-bold text-lg">{classType.price}</div>
                  {classType.name === "Economy" && (
                    <div className="text-xs text-red-600">Lowest price</div>
                  )}
                  <FaChevronDown
                    className={`mt-2 text-gray-400 transition-transform ${
                      expandedClass === classType.name.toLowerCase()
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ClassDetails
        classType={classTypes}
        expandedClass={expandedClass}
        onSelect={handleSelectButtonClick}
      />
    </div>
  );
};

export default FlightCard;
