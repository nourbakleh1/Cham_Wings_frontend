import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectFlight } from "../../../Redux/ApiSlices/flightSlice";
import { FaPlane, FaChevronDown } from "react-icons/fa";
import ClassDetails from "./ClassDetails";

const FlightCard = ({ flight, isSelected, onSelect, showOnlyClass }) => {
  const [expandedClass, setExpandedClass] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const dispatch = useDispatch();

  const handleClassSelect = (classType) => {
    setExpandedClass(expandedClass === classType ? null : classType);
  };

  const handleSelectButtonClick = (classType) => {
    dispatch(selectFlight({ flightId: flight?.flight_id, classType }));
    onSelect(flight, classType);
    setSelectedClass(classType);
    setExpandedClass(null);
  };

  const economyPriceTotal =
    flight?.economyPrice && flight?.price
      ? flight.economyPrice * flight.price
      : 0;

  const businessPriceTotal =
    flight?.businessPrice && flight?.price
      ? flight.businessPrice * flight.price
      : 0;

  const allClassTypes = [
    {
      name: "Economy",
      color: "green",
      price: `USD ${economyPriceTotal}`,
      weight: flight.economyWeight,
      meal: `Meal x${flight.economyMeals}`,
      cabinBaggage: flight.economyCabinBaggage,
      changeFee: flight.economyChangeFee,
      refundFee: flight.economyRefundFee,
    },
    {
      name: "Business",
      color: "blue",
      price: `USD ${businessPriceTotal}`,
      weight: flight.businessWeight,
      meal: `Meal x${flight.businessMeals}`,
      cabinBaggage: flight.businessCabinBaggage,
      changeFee: flight.businessChangeFee,
      refundFee: flight.businessRefundFee,
    },
  ];

  const classTypes = showOnlyClass
    ? allClassTypes.filter(
        (classType) =>
          classType.name.toLowerCase() === showOnlyClass.toLowerCase()
      )
    : allClassTypes;

  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md mb-4 my-8 ${
        isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left section */}
        <div className="p-4 border-b lg:border-b-0 lg:border-r border-gray-400 lg:w-3/5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-lg">{flight.flight_number}</span>
            <div>
              <span className="text-sm mr-2">{flight.model}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
              <div className="font-bold text-lg">
                {flight.departure_airport_name}
              </div>
              <div className="text-gray-600">{flight.departure_time}</div>
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
                <div>{flight.departure_date}</div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="font-bold text-lg">
                {flight.arrival_airport_name}
              </div>
              <div className="text-gray-600">{flight.arrival_time}</div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {classTypes.map((classType) => (
              <div
                key={classType.name}
                className={`relative border-b sm:border-b-0 sm:border-r last:border-r-0 border-gray-400 
                ${
                  expandedClass === classType.name.toLowerCase() ||
                  selectedClass === classType.name.toLowerCase() // Check if selectedClass is the same
                    ? "bg-blue-400 text-white"
                    : ""
                }`} // Keep the background blue and text white if the class is selected
              >
                <button
                  onClick={() =>
                    handleClassSelect(classType.name.toLowerCase())
                  }
                  className="w-full h-full p-4 py-8 text-left"
                >
                  <div
                    className={`font-semibold ${
                      expandedClass === classType.name.toLowerCase() ||
                      selectedClass === classType.name.toLowerCase()
                        ? "text-white"
                        : `text-${classType.color}-700`
                    }`}
                  >
                    {classType.name}
                  </div>
                  <div
                    className={`text-sm ${
                      expandedClass === classType.name.toLowerCase() ||
                      selectedClass === classType.name.toLowerCase()
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    from USD
                  </div>
                  <div
                    className={`font-bold text-lg ${
                      expandedClass === classType.name.toLowerCase() ||
                      selectedClass === classType.name.toLowerCase()
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {classType.price}
                  </div>
                  {classType.name === "Economy" && (
                    <div
                      className={`text-xs ${
                        expandedClass === classType.name.toLowerCase() ||
                        selectedClass === classType.name.toLowerCase()
                          ? "text-white"
                          : "text-red-600"
                      }`}
                    >
                      Lowest price
                    </div>
                  )}
                  <FaChevronDown
                    className={`mt-2 transition-transform ${
                      expandedClass === classType.name.toLowerCase() ||
                      selectedClass === classType.name.toLowerCase()
                        ? "text-white rotate-180"
                        : "text-gray-400"
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
