import React, { useEffect, useState } from "react";
import ImageHeader from "../../../Components/HeaderWithImage/ImageHeader";
import { FaChevronDown } from "react-icons/fa";

const TravelerMagazine = () => {
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
        title="TRAVELER MAGAZINE"
        image="/assets/images/OurServices/cover.webp"
      />

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-4 border-primary_color transform transition hover:scale-105 hover:shadow-xl">
          {/* Heading */}
          <h2 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-primary_color mb-6 border-b-2 pb-3 border-primary_color">
            Traveler Magazine is filled with enlightening articles
          </h2>

          {/* Text Content */}
          <ul className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-6">
            <li>
              Our Traveler Magazine is packed with insightful articles, helpful
              tips, and inspiring stories to help you make the most of your
              travels.
            </li>

            {/* Additional Content Hidden Initially on Small Screens */}
            <li
              className={`${
                isExpanded ? "block" : "hidden"
              } lg:block text-gray-700 leading-relaxed space-y-6`}
            >
              The Traveler Magazine is available on all of our flights in both
              paper and electronic versions.
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

export default TravelerMagazine;
