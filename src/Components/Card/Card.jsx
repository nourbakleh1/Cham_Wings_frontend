import React, { useState } from "react";

const Card = ({ imageUrl, alternateImages, title, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link}>
        <img
          className="object-cover w-full h-48 sm:h-64 transition duration-300 transform hover:scale-105 text-primary_color"
          src={isHovered ? alternateImages[0] : imageUrl}
          alt={title}
        />
      </a>
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold text-secoundary_color text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default Card;
