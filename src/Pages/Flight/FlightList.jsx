import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFlights,
  sendSelectedFlights,
} from "../../Redux/ApiSlices/flightSlice.js";
import FlightCard from "./components/FlightCard";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const FlightList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flights = useSelector((state) => state.flights.list);
  const status = useSelector((state) => state.flights.status);
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedInbound, setSelectedInbound] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFlights());
    }
  }, [status, dispatch]);

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

  const outboundFlights = flights.filter(
    (flight) => flight.type === "outbound"
  );
  const inboundFlights = flights.filter((flight) => flight.type === "inbound");

  const handleFlightSelect = (flight, type) => {
    if (type === "outbound") {
      setSelectedOutbound(flight);
    } else {
      setSelectedInbound(flight);
    }
  };

  const handleContinue = async () => {
    if (
      (outboundFlights.length > 0 && !selectedOutbound) ||
      (inboundFlights.length > 0 && !selectedInbound)
    ) {
      toast.error(
        "Please select both an outbound and inbound flight (if available) before continuing."
      );
      return;
    }

    const flightsToSend = [
      ...(selectedOutbound ? [selectedOutbound] : []),
      ...(selectedInbound ? [selectedInbound] : []),
    ];

    try {
      await dispatch(sendSelectedFlights(flightsToSend)).unwrap();
      navigate("/choose-seat");
    } catch (error) {
      toast.error("Error sending flight selection. Please try again.");
    }
  };

  return (
    <div className="full-width-container py-32 mx-4 sm:mx-8 lg:mx-32">
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
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-8 text-center">
        Available Flights
      </h2>
      {outboundFlights.length > 0 && (
        <section className="mb-6 sm:mb-12">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneDeparture
              className="text-blue-600 mx-2 sm:mx-4"
              size={20}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Outbound Flights
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {outboundFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isSelected={selectedOutbound && selectedOutbound.id === flight.id}
              onSelect={() => handleFlightSelect(flight, "outbound")}
            />
          ))}
        </section>
      )}
      {inboundFlights.length > 0 && (
        <section>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneArrival className="text-green-600 mx-2 sm:mx-4" size={20} />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Inbound Flights
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          {inboundFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isSelected={selectedInbound && selectedInbound.id === flight.id}
              onSelect={() => handleFlightSelect(flight, "inbound")}
            />
          ))}
        </section>
      )}
      <div className="mt-4 sm:mt-8 flex justify-center">
        <button
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 sm:px-4 w-full sm:w-1/3 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FlightList;
