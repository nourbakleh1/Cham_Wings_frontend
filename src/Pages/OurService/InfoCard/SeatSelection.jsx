import React, { useEffect, useState } from "react";
import ImageHeader from "../../../Components/HeaderWithImage/ImageHeader";
import { FaChevronDown } from "react-icons/fa";

const SeatSelection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-800 min-h-screen mt-[70px]">
      {/* Image Header */}
      <ImageHeader
        color="secoundary_color"
        title="SEAT SELECTION"
        image="/assets/images/OurServices/seatSelectionImage.webp"
      />

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-4 border-primary_color transform transition hover:scale-105 hover:shadow-xl">
          {/* Heading */}
          <h2 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-primary_color mb-6 border-b-2 pb-3 border-primary_color">
            Elevate your flight experience with Cham Wings Airlines
          </h2>

          {/* Text Content */}
          <ul className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-6">
            <li>
              Elevate your flight experience with Cham Wings Airlines by
              selecting your preferred seat using our Seat Selection Service.
              Whether you desire a window seat or one near the exit, we offer
              the perfect seating option for your journey.
            </li>

            {/* Additional Content Hidden Initially on Small Screens */}
            <li
              className={`${
                isExpanded ? "block" : "hidden"
              } lg:block text-gray-700 leading-relaxed space-y-6`}
            >
              Easily reserve your seat through our website, at any of Cham Wings
              Airlines’ sales offices, or through an authorized travel agent,
              ensuring a comfortable journey to your destination.
            </li>
          </ul>

          {/* Read More Button for Small Screens */}
          <div className="mt-4 text-center block sm:hidden">
            <button
              onClick={toggleReadMore}
              className="text-primary_color font-semibold flex items-center justify-center"
            >
              {isExpanded ? "Read Less" : "Read More"}{" "}
              <FaChevronDown
                className={`ml-2 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
