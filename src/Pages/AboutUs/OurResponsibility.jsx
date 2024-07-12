import React from "react";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const OurResponsibility = () => {
  return (
    <div className="bg-secoundary_color ">
      <ImageHeader
        color="secoundary_color"
        title="OUR RESPONSIBILITY"
        image="/assets/images/AboutUs/airport1.jpg"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md border-t-4 border-2 border-primary_color">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-primary_color">
            We take care of our community:
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>
              Cham Wings Airlines is looking forward to working on the
              development of the Syrian community, which we consider as our
              large family. Therefore, we strive in the company with an
              insightful strategy to support this family in all possible ways,
              as Cham Wings offers direct employment opportunities to more than
              300 Syrians through its operations in Damascus, and indirectly,
              has created hundreds of other jobs in Syria through its dealing
              with several local companies, in addition to its network of
              suppliers and partners around the world.
            </li>
            <li>
              Cham Wings Airlines plays an important role in enhancing Syrian
              participation in local and international events by sponsoring
              various social, artistic and cultural activities and that
              originates from our belief in the importance of supporting and
              developing the Syrian community in the best possible manner.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurResponsibility;
