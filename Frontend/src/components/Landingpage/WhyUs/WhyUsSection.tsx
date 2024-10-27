import HeartDumbbell from '/src/assets/images/Icons/HeartDumbbellWhite.png';
import Yoga from '/src/assets/images/Icons/YogaWhite.png';
import Trainer from '/src/assets/images/Icons/TrainerWhite.png';
import Sauna from '/src/assets/images/Icons/SaunaWhite.png';
import React, { useRef, useEffect } from 'react';
import './WhyUs.css';
import { Link } from 'react-router-dom';

const WhyChooseUs: React.FC = () => {
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subtitleElement = subtitleRef.current;

    if (!subtitleElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            subtitleElement.classList.add('fly-in');
            observer.disconnect(); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.1 } // Trigger when 20% of the element is visible
    );

    observer.observe(subtitleElement);

    return () => {
      if (subtitleElement) {
        observer.unobserve(subtitleElement);
      }
    };
  }, []);

  return (
    <>
      <div className="container h-auto pt-20 text-center bg-[#141414] grid grid-cols-4 justify-center max-w-[1280px] mx-auto px-4 ">
        <div className="col-span-4 text-white text-4xl md:text-6xl mb-14 font-kanit">
          Why choose us?
        </div>
        <h3
          ref={subtitleRef}
          className="text-primary text-xl text-semibold uppercase font-kanit subtitle col-span-4"
        >
          Our service for you
        </h3>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <Link to="/services/training-programs">
            <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4 transition-transform duration-500 hover:scale-x-[-1]">
              <img src={HeartDumbbell} />
            </div>
            <div className="absolute top-[60px] w-auto text-center px-2">
              <h2 className="text-xl mt-1 mb-3 underline">Training programs</h2>
              <p>
                We analyze your body composition and fitness goals and create
                personalized training programs
              </p>
            </div>
          </Link>
        </div>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <Link to="/services/courses">
            <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-5 transition-transform duration-500 hover:scale-x-[-1]">
              <img src={Yoga} />
            </div>
            <div className="absolute top-[60px] w-auto text-center px-2">
              <h2 className="text-xl mb-3 mt-1 underline">Courses</h2>
              <p>
                We offer a wide range of Courses including Yoga, Spinning
                Classes, Fitness or Boxing
              </p>
            </div>
          </Link>
        </div>
        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <Link to="/services/personal-trainers">
            <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4 transition-transform duration-500 hover:scale-x-[-1]">
              <img src={Trainer} />
            </div>
            <div className="absolute top-[60px] w-auto text-center px-2">
              <h2 className="text-xl mb-3 mt-1 underline">Personal Trainers</h2>
              <p>
                Our Personal Trainers are always there to help you achieve your
                goals
              </p>
            </div>
          </Link>
        </div>

        <div className="whyUsBox col-span-4 md:col-span-2 xl:col-span-1 bg-bdark ">
          <Link to="/services/sauna">
            <div className="iconCircle bg-primary w-24 h-24 rounded-full absolute left-1/2 top-[-48px] transform -translate-x-1/2 p-4 transition-transform duration-500 hover:scale-x-[-1]">
              <img src={Sauna} />
            </div>
            <div className="absolute top-[60px] w-auto text-center px-2">
              <h2 className="text-xl mb-3 mt-1 underline">Sauna</h2>
              <p>
                Enjoy and relax in our Sauna and Wellness area after a hard
                workout
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
