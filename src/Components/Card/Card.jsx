import React, { useState, useEffect } from "react";
import "./style.css";

const Card = ({ imageUrl, alternateImages, title, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card relative overflow-hidden rounded-lg shadow-md bg-white ${
        isVisible ? "animate-card" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link}>
        <div className="image-container relative">
          <img
            className="absolute w-full h-full pt-6 pb-2 transition duration-300 transform hover:scale-105"
            src={isHovered ? alternateImages[0] : imageUrl}
            alt={title}
          />
        </div>
      </a>
      <div className="pb-6 pt-6 bg-white text-center">
        <h3 className=" text-secoundary_color inline-block">
          {title}
          <div className="relative border-b-2 pt-0 border-blue-500"></div>
        </h3>
      </div>
    </div>
  );
};

export default Card;
