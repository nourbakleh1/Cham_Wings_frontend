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
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [animationClass, setAnimationClass] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFlights());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && flights.length > 0) {
      const outboundFlights = flights.filter(
        (flight) => flight.type === "outbound"
      );
      const inboundFlights = flights.filter(
        (flight) => flight.type === "inbound"
      );
      const outboundDates = getUniqueDates(outboundFlights);
      const inboundDates = getUniqueDates(inboundFlights);

      if (outboundFlights.length > 0) {
        setDepartureAirport(outboundFlights[0].departureAirport);
      }
      if (inboundFlights.length > 0) {
        setArrivalAirport(outboundFlights[0].arrivalAirport);
      }

      if (outboundDates.length > 0) {
        const firstDate = outboundDates[0];
        setSelectedDepartureDate(firstDate);

        const firstAvailableOutboundFlight = outboundFlights.find(
          (flight) => flight.departureDate === firstDate
        );
        if (firstAvailableOutboundFlight) {
          setSelectedOutbound(firstAvailableOutboundFlight);
        }
      }

      if (inboundDates.length > 0) {
        const firstDate = inboundDates[0];
        setSelectedArrivalDate(firstDate);

        const firstAvailableInboundFlight = inboundFlights.find(
          (flight) => flight.departureDate === firstDate
        );
        if (firstAvailableInboundFlight) {
          setSelectedInbound(firstAvailableInboundFlight);
        }
      }
    }
  }, [status, flights]);

  useEffect(() => {
    console.log("Selected Outbound Flight:", selectedOutbound);
    console.log("Selected Inbound Flight:", selectedInbound);
    console.log("Selected Departure Date:", selectedDepartureDate);
    console.log("Selected Arrival Date:", selectedArrivalDate);
  }, [
    selectedOutbound,
    selectedInbound,
    selectedDepartureDate,
    selectedArrivalDate,
  ]);

  const handleFlightSelect = (flight, type) => {
    if (type === "outbound") {
      setSelectedOutbound(flight);
      setAnimationClass("animate-slide-out");

      setTimeout(() => {
        const inboundFlights = flights.filter((f) => f.type === "inbound");
        const availableInboundDates = getUniqueDates(inboundFlights);
        if (availableInboundDates.length > 0) {
          const firstAvailableInboundDate = availableInboundDates[0];
          setSelectedArrivalDate(firstAvailableInboundDate);

          const firstAvailableInboundFlight = inboundFlights.find(
            (f) => f.departureDate === firstAvailableInboundDate
          );
          setSelectedInbound(firstAvailableInboundFlight);
        }
      }, 500);
    } else {
      setSelectedInbound(flight);
    }
  };

  const handleDepartureDateClick = (date) => {
    setSelectedDepartureDate(date);

    const newOutboundFlights = flights.filter(
      (flight) => flight.type === "outbound" && flight.departureDate === date
    );

    if (!selectedOutbound && newOutboundFlights.length > 0) {
      setSelectedOutbound(newOutboundFlights[0]);
    }
  };

  const handleArrivalDateClick = (date) => {
    setSelectedArrivalDate(date);

    const newInboundFlights = flights.filter(
      (flight) => flight.type === "inbound" && flight.departureDate === date
    );

    if (!selectedInbound && newInboundFlights.length > 0) {
      setSelectedInbound(newInboundFlights[0]);
    }
  };

  const getUniqueDates = (flights) => {
    const dates = flights.map((flight) => flight.departureDate);
    return [...new Set(dates)];
  };

  const handleContinue = async () => {
    const inboundFlights = flights.filter(
      (flight) => flight.type === "inbound"
    );
    if (!selectedOutbound || (inboundFlights.length > 0 && !selectedInbound)) {
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

  const outboundFlights = flights.filter(
    (flight) => flight.type === "outbound"
  );
  const inboundFlights = flights.filter((flight) => flight.type === "inbound");

  const filteredOutboundFlights = selectedDepartureDate
    ? outboundFlights.filter(
        (flight) => flight.departureDate === selectedDepartureDate
      )
    : outboundFlights;

  const filteredInboundFlights = selectedArrivalDate
    ? inboundFlights.filter(
        (flight) => flight.departureDate === selectedArrivalDate
      )
    : inboundFlights;

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
              {getUniqueDates(outboundFlights).map((date, index) => (
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
        {inboundFlights.length > 0 && (
          <div className="date-box flex-1 shadow-lg border-gray-300 border-t-2">
            <h4 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaPlaneArrival className="text-green-600 mr-2" size={24} />
              Arrival Airport
            </h4>
            <div className="date-filter mt-4">
              <div className="flex flex-wrap gap-2 overflow-x-auto whitespace-nowrap">
                {getUniqueDates(inboundFlights).map((date, index) => (
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

      {selectedDepartureDate && filteredOutboundFlights.length > 0 && (
        <section className="mb-6 sm:mb-12">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneDeparture
              className="text-blue-600 mx-2 sm:mx-4"
              size={20}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Departure Airport - {departureAirport}
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {selectedDepartureDate}
          </h3>
          {filteredOutboundFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isSelected={selectedOutbound && selectedOutbound.id === flight.id}
              onSelect={() => handleFlightSelect(flight, "outbound")}
            />
          ))}
        </section>
      )}

      {selectedArrivalDate && filteredInboundFlights.length > 0 && (
        <section>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <FaPlaneArrival className="text-green-600 mx-2 sm:mx-4" size={20} />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Arrival Airport - {arrivalAirport}
            </h3>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {selectedArrivalDate}
          </h3>
          {filteredInboundFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isSelected={selectedInbound && selectedInbound.id === flight.id}
              onSelect={() => handleFlightSelect(flight, "inbound")}
            />
          ))}
        </section>
      )}

      {filteredOutboundFlights.length === 0 &&
        filteredInboundFlights.length === 0 && (
          <div className="text-xl text-gray-600 text-center mt-6">
            No Flights Available
          </div>
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
