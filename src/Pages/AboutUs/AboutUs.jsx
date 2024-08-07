import React, { useEffect } from "react";
import Card from "../../Components/Card/Card";
import Headings from "../../Components/Headings/Headings";


const cardsData = [
  {
    imageUrl: "assets/images/AboutUs/company.svg",
    alternateImages: ["assets/images/AboutUs/company1.svg"],
    title: "OUR COMPANY",
    link: "/about-us/our-company",
  },
  {
    imageUrl: "assets/images/AboutUs/misson.svg",
    alternateImages: ["assets/images/AboutUs/misson1.svg"],
    title: "OUR MISSION",
    link: "/about-us/our-mission",
  },
  {
    imageUrl: "assets/images/AboutUs/fleet.svg",
    alternateImages: ["assets/images/AboutUs/fleet1.svg"],
    title: "OUR FLEET",
    link: "/about-us/our-fleet",
  },
  {
    imageUrl: "assets/images/AboutUs/service.svg",
    alternateImages: ["assets/images/AboutUs/service1.svg"],
    title: "OUR SERVICES",
    link: "/about-us/our-services",
  },
  {
    imageUrl: "assets/images/AboutUs/responsibilty.svg",
    alternateImages: ["assets/images/AboutUs/responsibilty1.svg"],
    title: "OUR RESPONSIBILITY",
    link: "/about-us/our-responsibility",
  },
  {
    imageUrl: "assets/images/AboutUs/letter.svg",
    alternateImages: ["assets/images/AboutUs/letter1.svg"],
    title: "CHAIRMAN'S LETTER",
    link: "/about-us/ceos-letter",
  },
];


const AboutUs = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  return (
    <div className="bg-secondary_color min-h-screen xs:py-16 md:py-24 bg-secoundary_color">
      <div className="flex justify-center items-center w-full xs:py-12 md:py-8 px-4">
        <div className="w-full max-w-7xl bg-secondary_color md:mt-2 lg:mt-8">
          <Headings element={"h1"}>About Us</Headings>
          <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:mt-8 gap-4 md:gap-8 md:pt-10">
            {cardsData.map((card, index) => (
              <div key={index} className="animate-card">
                <Card
                  imageUrl={card.imageUrl}
                  alternateImages={card.alternateImages}
                  title={card.title}
                  link={card.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
