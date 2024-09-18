import HeartDumbbell from "../../assets/images/Icons/HeartDumbbellWhite.png";
import Yoga from "../../assets/images/Icons/YogaWhite.png";
import Trainer from "../../assets/images/Icons/TrainerWhite.png";
import Sauna from "../../assets/images/Icons/SaunaWhite.png";
import React from "react";
import "./WhyUs.css";

const WhyChooseUs: React.FC = () => {
  return (
    <>
      <div className="container h-auto-16 pt-20 text-center bg-[#141414] grid grid-cols-4 justify-center max-w-[1280px] mx-auto ">
        <div className="col-span-4 text-white text-4xl md:text-6xl mb-14">
          Why choose us?
        </div>
        <h3 className="text-primary text-xl text-semibold uppercase font-kanit subtitle col-span-4">
          Our service for you
        </h3>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4">
            <img src={HeartDumbbell} />
          </div>
          <div className="absolute top-[60px] w-auto text-center px-2">
            <h2 className="text-xl mt-1 mb-3 underline">Training programs</h2>
            <p>
              We analyze your body composition and fitness goals and create
              personalized training programs
            </p>
          </div>
        </div>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-5">
            <img src={Yoga} />
          </div>
          <div className="absolute top-[60px] w-auto text-center px-2">
            <h2 className="text-xl mb-3 mt-1 underline">Courses</h2>
            <p>
              We offer a wide range of Courses including Yoga, Spinning Classes,
              Fitness or Boxing
            </p>
          </div>
        </div>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4">
            <img src={Trainer} />
          </div>
          <div className="absolute top-[60px] w-auto text-center px-2">
            <h2 className="text-xl mb-3 mt-1 underline">Personal Trainers</h2>
            <p>
              Our Personal Trainers are always there to help you achieve your
              goals
            </p>
          </div>
        </div>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4">
            <img src={Sauna} />
          </div>
          <div className="absolute top-[60px] w-auto text-center px-2">
            <h2 className="text-xl mb-3 mt-1 underline">Sauna</h2>
            <p>
              Enjoy and relax in our Sauna and Wellness area after a hard
              workout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
