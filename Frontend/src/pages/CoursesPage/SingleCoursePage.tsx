import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { useParams } from 'react-router-dom';

export default function SingleCoursePage() {
  const [course, setCourse] = useState({});
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
    </>
  );
}
