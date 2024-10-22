import './Hero.css';
import Hero2 from '../../../assets/images/Hero/hero_1_1.jpg';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const Hero: React.FC = () => {

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
      <section
        id="hero-section"
        className="hero bg-cover bg-center flex items-center lg:items-end"
      >
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-end">
            <div className="flex flex-col justify-center items-start text-white">
              <h3 ref={subtitleRef} className="text-primary text-xl text-semibold uppercase font-kanit subtitle mb-7">
                welcome to fit zone gym
              </h3>
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-kanit mb-4 font-bold uppercase">
                <span className="fly-in-left ready">Ready to</span>
                <span className="fly-in-right">train</span>
                <br /> <span className="fly-in-left yourBody">your body</span>
              </h1>

              <p className="text-lg md:text-xl mb-6">
                Gym workouts are structured exercise sessions conducted in a{' '}
                fitness facility equipped with various training machines, free
                weights, and amenities.
              </p>
              <Link to="/shop">
                <button className="bg-primary hover:bg-primary-dark text-white font-bold uppercase py-6 px-12 ">
                  view our shop
                </button>
              </Link>
            </div>
            <div className="hidden lg:flex justify-center items-center self-end">
              <img src={Hero2} alt="Hero Image" className="w-full h-auto heroEaseIn " />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
