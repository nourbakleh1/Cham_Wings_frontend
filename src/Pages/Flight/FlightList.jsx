import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedFlights, sendSelectedFlights } from "../../Redux/ApiSlices/flightSlice.js";
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
  const {user}= useSelector((state)=>state.auth);
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
  const [selectedDepartureClass, setSelectedDepartureClass] = useState(null);
  useEffect(()=>{
    
      window.scrollTo(0,0);
    dispatch(clearSelectedFlights());
   
  },[])
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

  const getUniqueDates = (flights) => {
    if (!Array.isArray(flights)) return [];

    const dates = flights.map((flight) => flight?.departure_date);

    // Remove duplicates and sort dates
    const uniqueDates = [...new Set(dates)];

    // Sort the dates in ascending order
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));

    return uniqueDates;
  };

  const handleFlightSelect = (flight, type, classType) => {
    if (type === "departure_flights") {
      // Set the latest selected departure flight and clear out previous return flights
      setSelectedDeparture(flight);
      setSelectedDepartureClass(classType);
      setAnimationClass("animate-slide-out");

      // Optionally update return flights based on the selected departure flight
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
      // Set the latest selected arrival flight
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
    if (
      !selectedDeparture ||
      (flights?.return_flights &&
        flights.return_flights.length > 0 &&
        !selectedArrival)
    ) {
      toast.error(
        "Please select both a Departure and Arrival flight (if available) before continuing."
      );
      return;
    }

    // Prepare the flight data to be sent
    const flightsToSend = [];

    if (selectedDeparture) {
      flightsToSend.push({
        flightId: selectedDeparture.id,
        classType: selectedDepartureClass || "economy",
      });
    }

    if (selectedArrival) {
      flightsToSend.push({
        flightId: selectedArrival.id,
        classType: selectedDepartureClass || "economy",
      });
    }

    try {
      await dispatch(sendSelectedFlights(flightsToSend)).unwrap();
      navigate("/reservation",{replace:true});
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

  const showContinueButton =
    filteredDepartureFlights.length > 0 || filteredArrivalFlights.length > 0;

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
      className={`full-width-container h-full md:py-28 xs:py-20 mx-4 sm:mx-8 lg:mx-32 ${animationClass}`}
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

      {/* Back Button */}
      {!showContinueButton && (
        <div className="mb-4 mt-4 md:mt-2 flex justify-start">
          <button
            className="flex items-center px-4 py-2 text-white bg-[#00529B] rounded-lg hover:bg-[#003d73] transition-colors duration-300"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
        </div>
      )}

      <div className="date-section md:mb-8 xs:mb-2 flex flex-col md:gap-8 sm:gap-2 sm:flex-row">
        {departureFlights.length > 0 && (
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
        )}
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
          {filteredDepartureFlights.map((flight, index) => (
            <FlightCard
              key={`departure-${index}`} // Use index if flight.id is undefined
              flight={flight}
              isSelected={
                selectedDeparture && selectedDeparture.id === flight.id
              }
              onSelect={(flight, classType) =>
                handleFlightSelect(flight, "departure_flights", classType)
              }
              showOnlyClass={null}
            />
          ))}
        </section>
      )}

      {/* {selectedArrivalDate && filteredArrivalFlights.length > 0 && ( */}
      {filteredArrivalFlights.length > 0 && (
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
          {filteredArrivalFlights.map((flight, index) => (
            <FlightCard
              key={`arrival-${index}`} // Use index if flight.id is undefined
              flight={flight}
              isSelected={selectedArrival && selectedArrival.id === flight.id}
              onSelect={(flight, classType) =>
                handleFlightSelect(flight, "return_flights", classType)
              }
              showOnlyClass={selectedDepartureClass}
            />
          ))}
        </section>
      )}

      {/* There is no flights */}
      {filteredDepartureFlights.length === 0 &&
        filteredArrivalFlights.length === 0 && (
          <div className="no-flights-container flex flex-col items-center justify-center h-[60vh] mx-auto text-center bg-gradient-to-r from-gray-200 to-white">
            <svg
              className="no-flights-icon text-red-400 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 12c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2s.9 2 2 2h8c1.1 0 2-.9 2-2zM12 2v20"></path>
            </svg>
            <h2 className="no-flights-text text-lg sm:text-xl md:text-2xl text-gray-800 font-bold mb-2">
              No Flights Available
            </h2>
            <p className="no-flights-subtext text-xs sm:text-sm md:text-base text-gray-600 px-2">
              Try adjusting your search criteria or check back later.
            </p>
          </div>
        )}

      
        <div className="flex justify-center items-start gap-3 flex-col  md:flex-row">
        
        
        <div className="mt-4 sm:mt-8 flex justify-center">

         {user &&<Button
            color={"#777"}
            padding="8px"
            onClick={()=>navigate(-1)}
            width="100px"
          >
            Back
          </Button>}
        </div>
            <div className="mt-4 sm:mt-8 flex justify-center">

            {user &&<Button
              color={"#00529B"}
              padding="8px"
              onClick={handleContinue}
              width="100px"
            >
              Continue
            </Button>}
            </div>
        </div>
      
    </div>
  );
};

export default FlightList;
