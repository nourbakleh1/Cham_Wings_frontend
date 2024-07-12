import React from "react";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const ChairMan = () => {
  return (
    <div className="bg-secoundary_color ">
      <ImageHeader
        color="secoundary_color"
        title="CHAIRMAN’S LETTER"
        image="/assets/images/AboutUs/airbus.jpg"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md border-t-4 border-4 border-primary_color">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-primary_color">
            We work hard to be able to meet your needs according to the highest
            international standards
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>Dear Customers:</li>
            <li>
              Welcome to our website, the official window of the company on the
              Internet to know the latest news, information and services related
              to Cham Wings Airlines and to enjoy your flights with us.
            </li>
            <li>
              We want to express the highest expressions of thanks and gratitude
              to all of you for your continued support to Cham Wings Airlines.
              All of us in this company, chiefs and employees, recognize the
              importance of the role that our clients play in the continuation
              of our development and achieving positive results as good as those
              we have seen since the establishment of the company. We still work
              hard to keep your trust and loyalty for our services, and continue
              to merit the medal of honor that you have given us by choosing
              Cham Wings Airlines to be a true partner in all your travels and
              destinations.
            </li>
            <li>
              We are constantly working to develop our fleet and expand our
              network of regional and international destinations, and develop
              and upgrade our services so that we can meet your needs in
              accordance with the highest international standards that we never
              compromise in anyway.
            </li>
            <li>
              We wish you a pleasant tour on our website, and we hope that our
              site will be your most flexible guide to planning your next
              journeys, enjoying the offers we offer on it and knowing more
              about our company. This site will enable you to know about our
              distinctive services that we provide, as we provide all the
              comfort and flexibility means during travel through the services
              available on this site.
            </li>
            <li>
              We would like to thank you again and express our great gratitude
              for choosing Cham Wings Airlines, the second national airline in
              Syria, as a trusted reliable partner in all your travels, wishing
              you comfortable and enjoyable journeys.
            </li>
            <li>Chairman of the board of directors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChairMan;
