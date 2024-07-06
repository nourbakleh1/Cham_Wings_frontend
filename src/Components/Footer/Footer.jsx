import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faTelegram,
  faWhatsapp,
  faThreads,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faHome, faEnvelope, faX } from "@fortawesome/free-solid-svg-icons";
import Headings from "../Headings/Headings";
import logo from "/assets/images/chamwings.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.facebook.com/chamwingsairlines.sy?mibextid=2JQ9oc"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
          </a>
          <a
            href="https://x.com/ChamWings"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faX} className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCWgYrSAezmEt2UYCer4PHFg"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faYoutube} className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/chamwingsairlines.official/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/chamwings-airlines/"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
          </a>

          <a
            href="https://t.me/Cham_Wings_Airlines"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faTelegram} className="h-4 w-4" />
          </a>
          <a
            href="https://www.whatsapp.com/channel/0029VaF2CRKKLaHnyVfoIo2j"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
          </a>
          <a
            href="https://www.threads.net/@chamwingsairlines.official"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faThreads} className="h-4 w-4" />
          </a>
          <a
            href="https://www.tiktok.com/@chamwingsairlines?_t=8mTQMBwB66U&_r=1"
            target="_blank"
            className="me-6 hover:text-primary_color focus:text-primary_color focus:outline-none"
          >
            <FontAwesomeIcon icon={faTiktok} className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center pb-8 justify-center font-semibold uppercase md:justify-start">
              <span className="me-3">
                <img src={logo} alt="Logo" className="h-10 w-10" />
              </span>
              Cham Wings Airlines
            </h6>
            <p>
              Cham Wings Airlines, the first Syrian private airline company was
              established at the end of 2007 with a national capital.
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center border-b-2 border-primary_color pb-2 font-semibold uppercase md:justify-start">
              Frequently visited pages
            </h6>
            <p className="mb-4">
              <a href="offers" className="hover:text-primary_color">
                Offers
              </a>
            </p>
            <p className="mb-4">
              <a href="contact" className="hover:text-primary_color">
                Contact
              </a>
            </p>
            <p className="mb-4">
              <a href="about-us" className="hover:text-primary_color">
                About us
              </a>
            </p>
            <p className="mb-4">
              <a href="our-services" className="hover:text-primary_color">
                Our Services
              </a>
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center border-b-2 border-primary_color pb-2 font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <a href="#!" className="hover:text-primary_color">
                Pricing
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className="hover:text-primary_color">
                Documentation
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className="hover:text-primary_color">
                Support
              </a>
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex justify-center border-b-2 border-primary_color pb-2 font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3">
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
              </span>
              Fardos Street - Damascus - Syria.
            </p>
            <p className="mb-4 flex justify-center md:justify-start">
              <span className="me-3">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              </span>
              <a
                href="mailto:cs@chamwings.com"
                className="hover:text-primary_color"
              >
                cs@chamwings.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 p-4 text-center dark:bg-black/5">
        <p className="text-xs text-neutral-400 dark:text-white/75">
          © 2024 Chamwings. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
