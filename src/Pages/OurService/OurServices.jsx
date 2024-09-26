import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Headings from "../../Components/Headings/Headings";
import Button from "../../Components/Button/Button";

const OurServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for no movement, 1 for next, -1 for previous

  const services = [
    {
      title: "InFlight Entertainment",
      image: "assets/images/OurServices/inFlightEntertainment.webp",
      link: "/our-services/inflight-entertainment",
      p: "In-flight entertainment system includes a wide selection of movies, series, TV shows, music albums.",
    },
    {
      title: "BUSINESS CLASS",
      image: "assets/images/OurServices/businessClass.webp",
      link: "/our-services/business-class",
      p: "Our business class offers numerous advantages to elevate your travel experience",
    },
    {
      title: "SEAT SELECTION",
      image: "assets/images/OurServices/seatSelection.webp",
      link: "/our-services/seat-selection",
      p: "Select your preferred seat",
    },
    {
      title: "UNACCOMPANIED MINORS",
      image: "assets/images/OurServices/unaccompaniedMinors.webp",
      link: "/our-services/unaccompanied-minors",
      p: "Catering to young travelers aged 6 –12 who are flying solo",
    },

    {
      title: "The Traveler Magazine",
      image: "assets/images/OurServices/travelMagazin.webp",
      link: "/our-services/the-traveler-magazine",
      p: "Our Traveler Magazine is packed with insightful articles and helpful tips",
    },
  ];

  const nextCard = () => {
    setDirection(1); // Set direction to right
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevCard = () => {
    setDirection(-1); // Set direction to left
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secoundary_color">
      <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12 max-w-screen-xl">
        <div className="my-6 md:my-8 lg:my-10">
          <Headings element={"h1"}>Our Services</Headings>
        </div>
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          <AnimatePresence custom={direction}>
            <motion.div
              key={currentIndex}
              className="absolute w-full h-full"
              initial={{
                opacity: 0,
                x: currentIndex === 0 ? 300 : direction === 1 ? 300 : -300,
                scale: 0.8,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -300 : 300,
                scale: 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              <Link to={services[currentIndex].link}>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl md:rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden h-full border border-white border-opacity-20">
                  <img
                    src={services[currentIndex].image}
                    alt={services[currentIndex].title}
                    className="w-full h-2/3 md:h-3/4 object-cover"
                  />
                  <div className="p-4 md:p-6 lg:p-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                      {services[currentIndex].title}
                    </h3>
                    <p className="mt-1 md:mt-2 lg:mt-3 text-xs md:text-sm lg:text-base text-gray-300">
                      {services[currentIndex].p}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-6 md:mt-8 lg:mt-10 space-x-2 md:space-x-4 lg:space-x-6">
          <Button
            color={"#AE8A3B"}
            className="w-20 sm:w-24 md:w-28 lg:w-32 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={prevCard}
          >
            Previous
          </Button>
          <Button
            color={"#AE8A3B"}
            className="w-20 sm:w-24 md:w-28 lg:w-32 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 text-xs sm:text-sm md:text-base lg:text-lg"
            onClick={nextCard}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
