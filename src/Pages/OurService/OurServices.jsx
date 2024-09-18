import React, { useState } from "react";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-secoundary_color">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="my-6 md:my-12">
          <Headings element={"h1"}>Our Services</Headings>
        </div>
        <div className="relative h-[350px] sm:h-[400px] md:h-[500px] max-w-sm sm:max-w-md md:max-w-4xl mx-auto">
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
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden h-full border border-white border-opacity-20">
                  <img
                    src={services[currentIndex].image}
                    alt={services[currentIndex].title}
                    className="w-full h-2/3 md:h-3/4 object-cover"
                  />
                  <div className="p-4 md:p-8">
                    <h3 className="text-xl md:text-3xl font-bold text-white">
                      {services[currentIndex].title}
                    </h3>
                    <p className="mt-1 md:mt-2 text-sm md:text-lg text-gray-300">
                      {services[currentIndex].p}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8 md:mt-12 space-x-4 md:space-x-8">
          <Button
            color={"#AE8A3B"}
            padding="12px"
            onClick={prevCard}
            width="10%"
          >
            Previous
          </Button>
          <Button
            color={"#AE8A3B"}
            padding="12px"
            onClick={nextCard}
            width="10%"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
