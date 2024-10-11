import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { Link, useLocation } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import { FaArrowRight } from 'react-icons/fa6';
import './CoursePage.css';
import HeroImage2 from '../../assets/images/Hero/hero_1_1.jpg';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { CourseTemplate } from '../../custom.Types/courseTemplatesType';
import Footer from '../../components/Footer/Footer';

export default function CoursesPage() {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const [courses, setCourses] = useState([]);
  console.log('🚀 ~ CoursesPage ~ courses:', courses);
  const [loading, setLoading] = useState(true);
  console.log('🚀 ~ CoursesPage ~ loading:', loading);

  // fetch  courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${URL}/public/courseTemplates`);
        const data = response.data;
        console.log('🚀 ~ fetchCourses ~ data:', data);
        setCourses(data.allTemplates);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching members data', error.response?.data);
        } else {
          console.error('Unexpected error', error);
        }
      }
    };
    fetchCourses();
  }, []);

  //useEffect to handle scroll lock when login form is open

  useEffect(() => {
    if (loginOpen) {
      //disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      //enable scroll
      document.body.style.overflow = 'unset';
    }
    // cleanup function for when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loginOpen]);

  return (
    <>
      <Header setLoginOpen={setLoginOpen} />

      <section
        id="breadcrumb-section"
        className="hero bg-cover bg-center flex items-center h-[30vh]"
        style={{
          backgroundImage: `url${HeroImage2}`
        }}
      >
        <div className="container mx-auto max-w-[1280px] px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
            <div className="flex flex-col justify-center items-start text-white">
              <h1 className="text-3xl md:text-4xl lg:text-6xl   font-kanit mb-4 font-bold ">
                Courses
              </h1>
              <ul className="font-archivo font-medium uppercase text-sm lg:text-lg flex">
                <li className="flex space-x-2 text-primary mr-2">
                  <Link to="/">
                    Home <span className="relative bottom-[2px]">&gt;&gt;</span>{' '}
                  </Link>
                </li>
                {pathnames.map((value, index) => {
                  const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathnames.length - 1;

                  return isLast ? (
                    <li key={index} className="text-white">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link to={routeTo} className="text-white hover:underline">
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="courses-section" className="bg-white py-10 pb-20">
        <div className="mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
          <div className=" px-4 ">
            {courses.length > 0 ? (
              <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-5  mt-5 md:mt-16">
                {courses.map((course: CourseTemplate) => (
                  <div
                    key={course._id}
                    className="w-full h-[600px] flex flex-col bg-white rounded-lg shadow-lg"
                  >
                    <img
                      src={course.coursePic}
                      alt={course.courseName}
                      className="w-full h-2/3 object-cover rounded-t-lg"
                    />
                    <div className="flex flex-col flex-shrink justify-center px-8 h-1/3">
                      <h1 className="text-gray-800 font-kanit font-semibold text-3xl tracking-tight mb-3 mt-3">
                        {course.courseName}
                      </h1>
                      <p className="text-gray-600 leading-6 truncate-text">
                        {course.description}
                      </p>
                      <Link to={course._id}>
                        <button className="relative course-btn flex items-center uppercase text-primary mt-3 mb-3">
                          Read more <FaArrowRight className="ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[400px]">
                <p className="text-lg">No courses available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      {loginOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Login setLoginOpen={setLoginOpen} />
        </div>
      )}
    </>
  );
}
