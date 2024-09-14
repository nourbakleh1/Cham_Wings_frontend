import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendSelectedFlights } from "../../Redux/ApiSlices/flightSlice.js";
import FlightCard from "./components/FlightCard";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Button from "../../Components/Button/Button.jsx";

const FlightList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.flights.status);
  const flights = useSelector((state) => state.flights.resultSearch);

  console.log("flights", flights);

  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [animationClass, setAnimationClass] = useState("");
  const [departureAirportName, setDepartureAirport] = useState("");
  const [arrivalAirportName, setArrivalAirport] = useState("");

  useEffect(() => {
    if (status === "idle" && flights?.departure_flights?.length > 0) {
      const departureFlights = flights?.departure_flights || [];
      const returnFlights = flights?.return_flights || [];
      const departureDates = getUniqueDates(departureFlights);
      const returnDates = getUniqueDates(returnFlights);

      if (departureFlights.length > 0) {
        setDepartureAirport(departureFlights[0]?.departure_airport_name || "");
      }
      if (returnFlights.length > 0) {
        setArrivalAirport(returnFlights[0]?.arrival_airport_name || "");
      }

      if (departureDates.length > 0) {
        const firstDate = departureDates[0];
        setSelectedDepartureDate(firstDate);

        const firstAvailableDepartureFlight = departureFlights.find(
          (flight) => flight?.departure_date === firstDate
        );
        if (firstAvailableDepartureFlight) {
          setSelectedDeparture(firstAvailableDepartureFlight);
        }
      }

      if (returnDates.length > 0) {
        const firstDate = returnDates[0];
        setSelectedArrivalDate(firstDate);

        const firstAvailableReturnFlight = returnFlights.find(
          (flight) => flight?.departure_date === firstDate
        );
        if (firstAvailableReturnFlight) {
          setSelectedArrival(firstAvailableReturnFlight);
        }
      }
    }
  }, [status, flights]);

  useEffect(() => {
    // console.log("selected Departure Flight:", selectedDeparture);
    // console.log("selected Arrival Flight:", selectedArrival);
    // console.log("Selected Departure Date:", selectedDepartureDate);
    // console.log("Selected Arrival Date:", selectedArrivalDate);
  }, [
    selectedDeparture,
    selectedArrival,
    selectedDepartureDate,
    selectedArrivalDate,
  ]);

  const getUniqueDates = (flights) => {
    if (!Array.isArray(flights)) return [];

    const dates = flights.map((flight) => flight?.departure_date);

    // Remove duplicates and sort dates
    const uniqueDates = [...new Set(dates)];

    // Sort the dates in ascending order
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));

    return uniqueDates;
  };

  const handleFlightSelect = (flight, type) => {
    if (type === "departure_flights") {
      setSelectedDeparture(flight);
      setAnimationClass("animate-slide-out");

      setTimeout(() => {
        const returnFlights = flights?.return_flights || [];
        const availableReturnDates = getUniqueDates(returnFlights);
        if (availableReturnDates.length > 0) {
          const firstAvailableReturnDate = availableReturnDates[0];
          setSelectedArrivalDate(firstAvailableReturnDate);

          const firstAvailableReturnFlight = returnFlights.find(
            (f) => f?.departure_date === firstAvailableReturnDate
          );
          setSelectedArrival(firstAvailableReturnFlight);
        }
      }, 500);
    } else {
      setSelectedArrival(flight);
    }
  };

  const handleDepartureDateClick = (date) => {
    setSelectedDepartureDate(date);

    const newDepartureFlights = flights?.departure_flights?.filter(
      (flight) => flight?.departure_date === date
    );

    if (!selectedDeparture && newDepartureFlights.length > 0) {
      setSelectedDeparture(newDepartureFlights[0]);
    }
  };

  const handleArrivalDateClick = (date) => {
    setSelectedArrivalDate(date);

    const newArrivalFlights = flights?.return_flights?.filter(
      (flight) => flight?.departure_date === date
    );

    if (!selectedArrival && newArrivalFlights.length > 0) {
      setSelectedArrival(newArrivalFlights[0]);
    }
  };

  const handleContinue = async () => {
    const returnFlights = flights?.return_flights || [];
    if (!selectedDeparture || (returnFlights.length > 0 && !selectedArrival)) {
      toast.error(
        "Please select both an Departure and Arrival flight (if available) before continuing."
      );
      return;
    }

    const flightsToSend = [
      ...(selectedDeparture ? [selectedDeparture] : []),
      ...(selectedArrival ? [selectedArrival] : []),
    ];

    try {
      await dispatch(sendSelectedFlights(flightsToSend)).unwrap();
      navigate("/reservation");
    } catch (error) {
      toast.error("Error sending flight selection. Please try again.");
    }
  };

  const departureFlights = flights?.departure_flights || [];
  const returnFlights = flights?.return_flights || [];

  const filteredDepartureFlights = selectedDepartureDate
    ? departureFlights.filter(
        (flight) => flight?.departure_date === selectedDepartureDate
      )
    : departureFlights;

  const filteredArrivalFlights = selectedArrivalDate
    ? returnFlights.filter(
        (flight) => flight?.departure_date === selectedArrivalDate
      )
    : returnFlights;

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="relative w-64 h-64">
          <svg
            className="absolute inset-0"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#E0E7FF"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray="502"
              strokeDashoffset="502"
              className="animate-dash"
            />
          </svg>
          <svg
            className="absolute inset-0 animate-plane"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
              fill="#3B82F6"
            />
          </svg>
        </div>
        <div className="mt-8 text-2xl font-semibold text-blue-600">
          Loading Flights
        </div>
        <div className="mt-2 text-gray-600">
          Please wait while we find the best options for you
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">
          Error loading flights. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`full-width-container md:py-28 xs:py-20 mx-4 sm:mx-8 lg:mx-32 ${animationClass}`}
    >
      <ToastContainer
        className="toast-container"
        toastClassName={({ type }) =>
          `toast-message ${
            type === "success" ? "toast-success" : "toast-error"
          }`
        }
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flight-date-section md:mb-8 xs:mb-2 flex flex-col md:gap-8 sm:gap-2 sm:flex-row">
        <div className="date-box flex-1 shadow-lg border-gray-300 border-t-2">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaPlaneDeparture className="text-blue-600 mr-2" size={24} />
            Departure Airport
          </h4>
          <div className="date-filter mt-4">
            <div className="flex flex-wrap md:gap-2 xs:gap-2 overflow-x-auto whitespace-nowrap">
              {getUniqueDates(departureFlights).map((date, index) => (
                <div
                  key={index}
                  className={`date-item cursor-pointer rounded-full py-1 px-4 text-center font-medium ${
                    date === selectedDepartureDate
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleDepartureDateClick(date)}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        </div>
        {returnFlights.length > 0 && (
          <div className="date-box flex-1 shadow-lg border-gray-300 border-t-2">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaPlaneArrival className="text-green-600 mr-2" size={24} />
              Arrival Airport
            </h4>
            <div className="date-filter mt-4">
              <div className="flex flex-wrap gap-2 overflow-x-auto whitespace-nowrap">
                {getUniqueDates(returnFlights).map((date, index) => (
                  <div
                    key={index}
                    className={`date-item cursor-pointer rounded-full py-1 px-4 text-center font-medium ${
                      date === selectedArrivalDate
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => handleArrivalDateClick(date)}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* {selectedArrivalDate && filteredDepartureFlights.length > 0 && ( */}
      {filteredDepartureFlights.length > 0 && (
        <section className="mb-6 sm:mb-12">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneDeparture
              className="text-blue-600 mx-2 sm:mx-4"
              size={20}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Departure Airport - {departureAirportName}
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {selectedDepartureDate}
          </h3>
          {filteredDepartureFlights.map((flight) => (
            <FlightCard
              key={`departure-${flight.id}`}
              flight={flight}
              isSelected={
                selectedDeparture && selectedDeparture.id === flight.id
              }
              onSelect={() => handleFlightSelect(flight, "departure_flights")}
            />
          ))}
        </section>
      )}

      {/* {filteredArrivalFlights.length > 0 && ( */}
      {selectedArrivalDate && filteredArrivalFlights.length > 0 && (
        <section>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneArrival className="text-green-600 mx-2 sm:mx-4" size={20} />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Arrival Airport - {arrivalAirportName}
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {selectedArrivalDate}
          </h3>
          {filteredArrivalFlights.map((flight) => (
            <FlightCard
              key={`arrival-${flight.id}`}
              flight={flight}
              isSelected={selectedArrival && selectedArrival.id === flight.id}
              onSelect={() => handleFlightSelect(flight, "return_flights")}
            />
          ))}
        </section>
      )}

      {filteredDepartureFlights.length === 0 &&
        filteredArrivalFlights.length === 0 && (
          <div className="text-xl text-gray-600 text-center mt-6">
            No Flights Available
          </div>
        )}
      <div className="mt-4 sm:mt-8 flex justify-center">
        {/* <button
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 sm:px-4 w-full sm:w-1/3 rounded"
        >
          Continue
        </button> */}
        <Button
          color={"#00529B"}
          padding="12px"
          onClick={handleContinue}
          width="35%"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FlightList;
