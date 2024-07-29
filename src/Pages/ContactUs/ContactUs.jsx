import React from "react";
import "./style.css";
import ImageHeader from "../../Components/HeaderWithImage/ImageHeader";

const ContactUs = ({ primaryColor, secondaryColor }) => {
  const offices = [
    {
      city: "Damascus",
      name: "Cham Wings Airlines Office",
      address: "Fardos Street - Damascus - Syria",
      phone: "00963-11-8011",
      email: "sales@chamwings.com",
      hours: "09:00 - 17:00 [Sat-Thu], Friday: Off",
    },
    {
      city: "Damascus",
      name: "Cham Wings Airlines Office",
      address: "Damascus International Airport",
      phone: "00963-11-5400714",
      email: "ato@chamwings.com",
      hours: "24 hours / 7 Days",
    },
    {
      city: "Damascus",
      name: "Cham Wings Airlines Office",
      address: "Masa Plaza Mall in Al-Midan",
      phone: "00963-11-8842222",
      email: "medan.sales@chamwings.com",
      hours: "11:00 – 21:00 [Sat-Thu], Friday: 14:00 - 22:00",
    },
    {
      city: "Damascus Countryside",
      name: "Cham Wings Airlines Office",
      address: "Alsayeda Zainab, Alrawda Square, behind Qasr Aldeiafeh Hotel",
      phone:
        "Tel: 00963-11-6476698 / 00963-11-6476697, Mobile: 00963-958058930",
      email: "alsayeda.sales@chamwings.com",
      hours: "10:00 - 18:00 [Sat-Thu], Friday: Off",
    },
    {
      city: "Aleppo",
      name: "Cham Wings Airlines Office",
      address: "Sheraton Hotel",
      phone: "00963-21-2116855",
      email: "aleppo.sales@chamwings.com",
      hours: "09:00 - 17:00 [Sat-Thu], Friday: Off",
    },
  ];

  return (
<div className="bg-secoundary_color mt-[70px]">
  <ImageHeader
    color="secoundary_color"
    title="CONTACT US"
    image="/assets/images/ContactUs/CustomerService.webp"
  />

  <div className="max-w-7xl mx-auto px-4 xs:px-1 sm:px-6 lg:px-8 py-12">
    <div className="backdrop-filter backdrop-blur-md bg-white bg-opacity-20 rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8 transform hover:scale-105 transition-all duration-300 shadow-xl">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">
        Customer Care
      </h2>
      <p className="text-white text-sm sm:text-sm md:text-base leading-relaxed">
        We're here to ensure your journey is smooth from start to finish.
        Our dedicated team is ready to assist you with any inquiries or
        special requests. Your comfort and satisfaction are our top
        priorities.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {offices.map((office, index) => (
        <div
          key={index}
          className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-opacity-100"
        >
          <div className="flex items-start mb-3 sm:mb-4">
            <div className="hidden sm:flex w-10 h-10 sm:w-16 sm:h-16 rounded-full items-center justify-center text-white text-lg sm:text-3xl font-bold shadow-md bg-primary_color">
              {office.city[0]}
            </div>
            <h3 className="text-sm sm:text-lg md:text-xl font-bold ml-2 sm:ml-4 text-gray-900">
              {office.city}
            </h3>
          </div>
          <p className="font-medium text-xs sm:text-sm md:text-base mb-1 sm:mb-2 text-black">
            {office.name}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-4">
            {office.address}
          </p>
          <div className="space-y-2 sm:space-y-3">
            <p className="flex items-center text-xs sm:text-sm text-gray-900">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {office.phone}
            </p>
            <p className="flex items-center text-xs sm:text-sm">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${office.email}`}
                className="text-black hover:underline"
              >
                {office.email}
              </a>
            </p>
            <p className="flex items-center text-xs sm:text-sm text-gray-900">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {office.hours}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default ContactUs;
