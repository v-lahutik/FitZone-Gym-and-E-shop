import React, { useState, useRef, useEffect } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../utils/URL';
import './CourseGallery.css';

const CarouselItem: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if the screen size is mobile or not
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${URL}/public/courseTemplates`);
        const data = response.data;
        setCourses(data.allTemplates);
      } catch (error) {
        console.error('Error fetching courses data', error);
      }
    };

    fetchCourses();
  }, []);

  // Function to change slides
  const handleSlideChange = (direction: number) => {
    const totalItems = courses.length;
    setActiveIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) {
        return totalItems - 1; // Wrap around to the last item if going backward
      } else if (newIndex >= totalItems) {
        return 0; // Wrap around to the first item if going forward
      }
      return newIndex;
    });
  };

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange(1);
    }, 3500);

    return () => clearInterval(interval);
  }, [courses]);

  const totalCourses = courses.length;

  // For mobile, translate by 100%; for desktop, translate by one-third (33.33%)
  const translateX = isMobile
    ? `-${activeIndex * 100}%` // Slide 100% per item for mobile
    : `-${(activeIndex * 100) / 3}%`; // Slide 33.33% per item for larger screens

  return (
    <div className="min-h-[50vh] bg-blackColor2 p-3 relative">
      <div className="relative w-full overflow-hidden">
        {/* Wrapper for the slides */}
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(${translateX})`
          }}
        >
          {/* Render all courses */}
          {courses.map((course, index) => {
            // Determine if the current course is the middle one (active) for larger screens
            const isActive =
              !isMobile &&
              index === (activeIndex + Math.floor(3 / 2)) % totalCourses;

            return (
              <div
                key={course._id}
                className={`carousel-item p-4 ${isActive ? 'active' : ''}`}
              >
                <div className="h-[400px] flex flex-col bg-white rounded-lg">
                  <img
                    src={course.coursePic}
                    alt={course.courseName}
                    className="w-full h-2/3 object-cover rounded-t-lg"
                  />
                  <div className="flex flex-col justify-center px-4 py-2 h-1/3">
                    <h1 className="text-gray-900 font-bold text-xl text-center">
                      {course.courseName}
                    </h1>
                    <p className="text-gray-600 text-center">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow Controls */}
        <div className="absolute top-[50%] transform -translate-y-1/2 w-full flex justify-between z-10">
          {/* Left Arrow */}
          <button
            onClick={() => handleSlideChange(-1)}
            className="bg-primary rounded-full transform hover:scale-110 transition-all"
          >
            <FaRegArrowAltCircleLeft className="text-white h-10 w-10" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleSlideChange(1)}
            className="bg-primary rounded-full transform hover:scale-110 transition-all"
          >
            <FaRegArrowAltCircleRight className="text-white h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseGallery: React.FC = () => {
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
      <section id="courses" className="bg-blackColor2 my-14">
        <div className="container h-auto pt-20 text-center text-white bg-blackColor2 justify-center max-w-[1280px] mx-auto px-4">
          <h1 className="sm:text-4xl text-2xl font-kanit mb-14">
            Get fit together with one of our many courses
          </h1>
          <h3
            ref={subtitleRef}
            className="text-primary text-xl text-semibold uppercase font-kanit subtitle col-span-4"
          >
            A selection of our courses
          </h3>
          <CarouselItem />
          <div>
            <Link to="/courses">
              <button className="bg-primary hover:bg-primary-dark text-white font-bold uppercase py-6 px-12 ">
                View All Courses
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseGallery;
