import React, { useEffect } from "react";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const OurFleet = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <div className="bg-secoundary_color mt-[70px]">
      <ImageHeader
        color="secoundary_color"
        title="OUR FLEET"
        image="/assets/images/AboutUs/fleet.webp"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md border-t-4 border-4 border-primary_color">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-primary_color">
            Fly with confidence with our fleet
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>
              Cham Wings fleet was chosen precisely and professionally to fit
              with the destinations and services that our customers expect.
            </li>
            <li>
              provide for you a world of comfort, luxury and safety. As a
              result, traveling with us will be a unique and easy experience
              more than any time before.
            </li>
            <li>
              The company possesses modern “Airbus 320” planes, which conjoin
              the latest technology and the modern equipment, so that our dear
              customers can be sure that every journey will be on the highest
              international safety measures, which we don’t compromise anyway.
            </li>
            <li>
              The company has future plans to buy and join another group of
              planes that suits the running plans of different domestic and
              foreign destinations. Cham Wings always strive to promote and
              develop its fleet, especially in long journeys. That means adding
              more new destinations beside its current network, and thus,
              providing wider and broader choices for the travelers on its
              airlines.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurFleet;
