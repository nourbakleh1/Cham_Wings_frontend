import React, { useEffect } from "react";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const Mission = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <div className="bg-secoundary_color mt-[70px]">
      <ImageHeader
        color="secoundary_color"
        title="OUR MISSION & VALUES"
        image="/assets/images/AboutUs/airport1.webp"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md border-t-4 border-4 border-primary_color">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-primary_color">
            Mission Statement
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>
              Striving to be the first choice for travelers by attaining their
              satisfaction.
            </li>
            <li>
              Connecting Syrian citizens with their homeland by providing
              flexible flight timetables that suit their necessities and
              aspirations.
            </li>
            <li>
              Interacting with all traveler requirements and moving forward
              toward achieving their aspirations and developing beyond their
              expectations.
            </li>
            <li>
              Providing the highest quality of service and the ultimate care for
              travelers’ comfort.
            </li>
            <li>Accurately adhere to time and deadlines.</li>
            <li>
              Cham Wings has a creative and efficient working team who is
              passionate about providing the best values and experience.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mb-6 mt-12">
            Our Values
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>Safety comes first</li>
            <li>Efficiency</li>
            <li>Professionalism</li>
            <li>Teamwork</li>
            <li>Supporting Syrian community / Economy / Tourism</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mission;
