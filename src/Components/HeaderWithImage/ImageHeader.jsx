import React from "react";

const ImageHeader = ({ color, title, image }) => {
  return (
    <div className={`bg-${color}`}>
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden">
        <img
          className="absolute h-full w-full object-cover"
          src={image}
          alt="Mission Image"
        />
      </div>
      <div className={`inset-0 bg-${color}_1 flex items-center justify-center border-t-4 border-primary_color`}>
        <div className="flex items-center">
          <div className="h-px w-16 bg-white mr-4 lg:mr-8 hidden sm:block"></div>
          <h1 className="sm:text-xl lg:text-2xl font-thin text-white p-1">
            {title}
          </h1>
          <div className="h-px w-16 bg-white ml-4 lg:ml-8 hidden sm:block"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageHeader;
