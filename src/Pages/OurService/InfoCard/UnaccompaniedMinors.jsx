import React, { useEffect, useState } from "react";
import ImageHeader from "../../../Components/HeaderWithImage/ImageHeader";
import { FaChevronDown } from "react-icons/fa";

const UnaccompaniedMinors = () => {
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
        title="UNACCOMPANIED MINORS"
        image="/assets/images/OurServices/unaccompaniedMinorsGirl.webp"
      />

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-4 border-primary_color transform transition hover:scale-105 hover:shadow-xl">
          {/* Heading */}
          <h2 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-primary_color mb-6 border-b-2 pb-3 border-primary_color">
            Specialized Unaccompanied Minors Travel Service
          </h2>

          {/* Text Content */}
          <ul className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-6">
            <li>
              Catering to young travelers aged 6–12 who are flying solo. Our
              dedicated staff welcomes minors at the check-in desk and provides
              attentive supervision from there to the boarding gate, ensuring a
              safe and seamless journey for your child.
            </li>

            {/* Additional Content Hidden Initially on Small Screens */}
            <li
              className={`${
                isExpanded ? "block" : "hidden"
              } lg:block text-gray-700 leading-relaxed space-y-6`}
            >
              Upon arrival, our reception staff will carefully reunite the
              child with their parent or guardian, prioritizing their
              well-being and comfort throughout the travel experience.
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

export default UnaccompaniedMinors;
