import React, { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Boxing from "../../assets/images/Courses/boxing.jpg";
import Yoga from "../../assets/images/Courses/yoga.jpg";
import BodyWeight from "../../assets/images/Courses/bodyweight.jpg";

function Carousel() {
  // State to manage the active slide
  const [activeSlide, setActiveSlide] = useState(1);

  // Function to change slides
  const handleSlideChange = (slideNumber: number) => {
    setActiveSlide(slideNumber);
  };

  return (
    <div className="min-h-[50vh] bg-blackColor2 p-3 relative">
      {/* Main container for the carousel */}
      <div className="relative w-full max-w-xl mx-auto">
        {/* First Slide */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            activeSlide === 1
              ? "opacity-100 z-10 visible"
              : "opacity-0 z-0 invisible"
          }`}
        >
          {/* Slide Content */}
          <div className="w-full h-[400px] flex flex-col bg-white rounded-lg shadow-lg">
            <img
              src={Boxing}
              alt="Boxing Classes"
              className="w-full h-2/3 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-center px-8 h-1/3">
              <h1 className="text-gray-900 font-bold text-2xl tracking-tight">
                Boxing Classes (Beginner & Advanced)
              </h1>
              <p className="text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Second Slide */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            activeSlide === 2
              ? "opacity-100 z-10 visible"
              : "opacity-0 z-0 invisible"
          }`}
        >
          {/* Slide Content */}
          <div className="w-full h-[400px] flex flex-col bg-white rounded-lg shadow-lg">
            <img
              src={Yoga}
              alt="Yoga Classes"
              className="w-full h-2/3 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-center px-8 h-1/3">
              <h1 className="text-gray-900 font-bold text-2xl tracking-tight">
                Yoga Classes
              </h1>
              <p className="text-gray-600 leading-6">
                Egestas diam in arcu cursus euismod quis.
              </p>
            </div>
          </div>
        </div>

        {/* Third Slide */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            activeSlide === 3
              ? "opacity-100 z-10 visible"
              : "opacity-0 z-0 invisible"
          }`}
        >
          {/* Slide Content */}
          <div className="w-full h-[400px] flex flex-col bg-white rounded-lg shadow-lg">
            <img
              src={BodyWeight}
              alt="Bodyweight Fitness Classes"
              className="w-full h-2/3 object-cover rounded-t-lg"
            />
            <div className="flex flex-col justify-center px-8 h-1/3">
              <h1 className="text-gray-900 font-bold text-2xl tracking-tight">
                Bodyweight Fitness Classes
              </h1>
              <p className="text-gray-600 leading-6">
                Fusce id velit ut tortor egestas diam in arcu.
              </p>
            </div>
          </div>
        </div>

        {/* Arrow Controls */}
        <div className="absolute top-[266px] transform -translate-y-1/2 w-full flex justify-between z-20">
          {/* Left Arrow */}
          <button
            onClick={() =>
              handleSlideChange(activeSlide === 1 ? 3 : activeSlide - 1)
            }
            className="bg-primary rounded-full transform -translate-x-5 hover:scale-110 transition-all"
          >
            <FaRegArrowAltCircleLeft className="text-white h-10 w-10" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              handleSlideChange(activeSlide === 3 ? 1 : activeSlide + 1)
            }
            className="bg-primary rounded-full transform translate-x-5 hover:scale-110 transition-all"
          >
            <FaRegArrowAltCircleRight className="text-white h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
}

const CourseGallery: React.FC = () => {
  return (
    <>
      <section id="courses" className="bg-blackColor2">
        <div className="container h-auto pt-20 text-center text-white bg-blackColor2 justify-center max-w-[1280px] mx-auto px-4">
          <h1 className="sm:text-4xl text-2xl font-kanit mb-14">
            Get fit together with one of our many courses
          </h1>
          <h3 className="text-primary text-xl text-semibold uppercase font-kanit subtitle col-span-4">
            A selection of our courses
          </h3>
          <Carousel />
        </div>
      </section>
    </>
  );
};

export default CourseGallery;
