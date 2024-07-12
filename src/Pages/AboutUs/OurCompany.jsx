import React from "react";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const OurCompany = () => {
  return (
    <div className="bg-secoundary_color ">
      <ImageHeader
        color="secoundary_color"
        title="OUR COMPANY"
        image="/assets/images/AboutUs/airport1.jpg"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-md border-t-4 border-4 border-primary_color">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-primary_color">
            Cham Wings Airlines was founded in late 2007
          </h2>
          <ul className="sm:text-xl lg:text-xl text-gray-700 leading-relaxed space-y-4">
            <li>
              Cham Wings Airlines, the first Syrian private airline company was
              established at the end of 2007 with a national capital, as one of
              the commercial Shammout group companies. Its establishment came as
              a result of the economic openness and the new laws came out at
              that time by the Syrian government as an encouragement to the
              private sector to enter into the air transport field to meet the
              growing necessities of the travel market.
            </li>
            <li>
              On the 23rd of September 2007, the company got an air operator’s
              certificate from the Syrian Civil Aviation Authority, which has
              enabled it to start applying its strategy and achieve its first
              goal that is adding a value to the air transport field in Syria.
            </li>
            <li>
              Cham Wings Airlines has its headquarters and center of its
              activities in Damascus. Its first flight took off from Damascus
              international airport to Baghdad airport on the 20th of November.
            </li>
            <li>
              Afterwards, the company began its expansion gradually to be able
              to cover many Arab and international stations, and became, then,
              the second national airline that connects Syria with the rest of
              the world.
            </li>
            <li>
              In a brief period, Cham Wings Airlines has been able to develop
              its fleet and promote its services, and has built a good
              reputation among its customers. That was achieved through taking
              care of the finest details and meeting all the necessities.
            </li>
            <li>
              Cham Wings Airlines organizes regular flights to many destinations
              that meet its customers’ necessities, especially places where
              Syrian communities increase, like Sharjah, Moscow, Beirut,
              Yerevan, Kuwait, and other Arab and international countries.
            </li>
            <li>
              By flying from and to Damascus, Aleppo and Latakia, the company
              facilitated many hardships that faced passengers, traveling either
              outside or back to their homeland.
            </li>
            <li>
              Although the company had been through many big challenges, it
              managed to prove itself in the air transport market, both the
              domestic and foreign as well. That was achieved by the care and
              attention that the company gives to safety measures, which was and
              still on the top of its priorities. In addition, the company has
              its special staff of efficient and professional employees, and all
              of them care about the finest details, so that traveling would be
              a wonderful experience for our customers.
            </li>
            <li>
              Cham Wings Airlines has earned many local and Arab prizes for its
              distinction in the services that it provides, and consequently,
              the company could occupy a distinguished position among all air
              transport companies in the area.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurCompany;
