import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { useParams } from 'react-router-dom';
import { CourseTemplate } from '../../custom.Types/courseTemplatesType';
import { FaArrowRight } from 'react-icons/fa6';
import './CoursePage.css';

export default function SingleCoursePage() {
  const [course, setCourse] = useState<CourseTemplate | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const { id } = useParams();
  console.log('🚀 ~ SingleCoursePage ~ id:', id);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log('🚀 ~ SingleCoursePage ~ pathnames:', pathnames);

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

  // fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${URL}/public/courseTemplates/${pathnames[1]}`
        );
        const data = response.data;
        console.log('🚀 ~ fetchCourses ~ data:', data);
        setCourse(data.template);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching members data', error.response?.data);
        } else {
          console.error('Unexpected error', error);
        }
      }
    };
    fetchCourse();
  }, []);

  console.log('course', course);

  return (
    <>
      <Header setLoginOpen={setLoginOpen} />

      <section
        id="breadcrumb-section"
        className="hero bg-cover bg-center flex items-center h-[30vh]"
        style={{
          backgroundImage:
            "url('/src/assets/images/Hero/Background-breadcrumb.png')"
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

                <li>
                  <Link to="/courses" className="text-white mr-1">
                    Courses &gt;
                  </Link>
                </li>
                <li className="text-white">
                  {course?.courseName ? course?.courseName : 'Loading...'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="single-course" className=" bg-white py-10 lg:px-14 md:px-6">
        <div className="flex flex-wrap mb-5 container h-auto pt-20 max-w-[1280px] mx-auto">
          <div className="w-full md:w-7/12 lg:w-8/12 px-4">
            <div className="th-page page-single">
              <div className="page-img">
                <img src={course?.coursePic} alt="page Image" />
              </div>
              {/* Page Content */}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="page-content">
                  <h2 className="page-title text-4xl font-bold mt-4 mb-3">
                    {course?.courseName}
                  </h2>
                  <p className="mt-2 text-body text-archivo">
                    {course?.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-5/12 lg:w-4/12 px-4">
            <aside className="sidebar ">
              <div className="widget mb-8">
                <h3 className="widget-title h4">Our Services</h3>
                <ul className="categories">
                  <li>
                    <a href="">
                      Training programs
                      <FaArrowRight />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Courses <FaArrowRight />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Personal Trainers <FaArrowRight />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      Sauna <FaArrowRight />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="widget mb-8">
                <h3 className="widget-title h4">Course Highlights</h3>
                <ul className="course-highlights">
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Instructor: </strong>
                        {course?.instructor}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Weekday: </strong>
                        {course?.weekday}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Time: </strong>
                        {course?.time.start} - {course?.time.end}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Max Participant: </strong>
                        {course?.maxParticipants}
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="highlight-title">
                      <h4>
                        <strong>Categories: </strong>
                        {course?.category.map((cat) => (
                          // display cat with comma exept last one
                          <span key={cat}>
                            {cat}
                            {course?.category.indexOf(cat) !==
                            course?.category.length - 1
                              ? ', '
                              : ''}
                          </span>
                        ))}
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
