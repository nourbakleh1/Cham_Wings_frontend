// AboutUs.js

import React from "react";
import Card from "../../Components/Card/Card";
import Headings from "../../Components/Headings/Headings";
import "./style.css";

const cardsData = [
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "OUR COMPANY",
    link: "/our-company",
  },
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "OUR MISSION",
    link: "/our-mission",
  },
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "OUR FLEET",
    link: "/our-fleet",
  },
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "OUR SERVICES",
    link: "/our-services",
  },
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "OUR RESPONSIBILITY",
    link: "/our-responsibility",
  },
  {
    imageUrl: "assets/images/register.svg",
    alternateImages: ["assets/images/login.svg"],
    title: "CHAIRMAN'S LETTER",
    link: "/ceos-letter",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-secondary_color min-h-screen xs:py-16 md:py-24 bg-secoundary_color">
      <div className="container mx-auto xs:py-12 md:py-8 px-4">
        <Headings element={"h1"}>About Us</Headings>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 md:pt-12">
          {cardsData.map((card, index) => (
            <div key={index} className="card animate-card">
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
  );
};

export default AboutUs;
