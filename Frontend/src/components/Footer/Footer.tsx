import React from "react";
import Logo from "../../assets/images/Logo/fitzone_logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";



const Footer: React.FC = () => {
  return (
    <footer className="bg-blackColor2 mt-10 pt-5 footer">
      <div className="footerContent">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center max-w-md mx-auto">
            <img src={Logo} alt="Fitzone Logo" />
          </div>

          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            consequuntur amet culpa cum itaque neque.
          </p>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li className="textLink">About us</li>

            <li className="textLink">Career</li>

            <li className="textLink">Contact</li>

            <li className="textLink">Services</li>

            <li className="textLink">Imprint</li>
          </ul>

          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            <li className="textLink text-2xl">
              <span className="sr-only">Facebook</span>
              <FaFacebook />
            </li>

            <li className="textLink text-2xl">
              <span className="sr-only">Instagram</span>
              <FaInstagram />
            </li>

            <li className="textLink text-2xl">
              <span className="sr-only">Twitter X</span>
              <FaXTwitter />
            </li>
            <li className="textLink text-2xl">
              <span className="sr-only">TikTok</span>
              <FaTiktok />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
