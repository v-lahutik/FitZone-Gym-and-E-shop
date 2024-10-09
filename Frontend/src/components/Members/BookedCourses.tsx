import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Course } from './MembersCourseTable';
import { cancelBookedCourse } from './BookingRequest';


const BookedCourses: React.FC = () => {
  const [bookedCourses, setBookedCourses] = useState<Course[]>([]); // get all course
  const [extendDetail, setExtendDetail] = useState<string|null>(null); // to see details that is hidden
  const [courseCancel, setCourseCancel] = useState<boolean>(false); // to trigger useEffect again when the course canceled

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${URL}/users/courses/forMember`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        if (response.status === 200) {
          console.log('Data fetched:', response);
          const allCourses = response.data.allCourses;
          const userID = response.data.payload.id;
          const myBookedCourses = allCourses.filter((course:Course) =>
            course.participants.includes(userID)
          );
          setBookedCourses(myBookedCourses);
          setCourseCancel(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error fetching courses:', error.response?.data);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };
    fetchCourses();
  }, [courseCancel]);

  console.log(bookedCourses); // development purpose

  // Toggle order row expansion
  const toggleCourseDetail = (idNumber:string) => {
    setExtendDetail(extendDetail === idNumber ? null : idNumber);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className=" max-w-full overflow-x-auto">
        {bookedCourses.length === 0 ? (
          <p className="text-center py-4">No Booked Course</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-11">
                  Course Name
                </th>
                <th className="min-w-[120px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Date
                </th>
                <th className="min-w-[120px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Time
                </th>
                <th className="min-w-[120px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Instructor
                </th>
                <th className="min-w-[50px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  details
                </th>
                <th className="min-w-[50px] py-4 px-4 text-sm font-bold  text-black dark:text-white"></th>
              </tr>
            </thead>
            <tbody>
              {bookedCourses.map((course, key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-sm  text-black dark:text-white">
                        {course.courseName}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.date.slice(0,10)}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.time.start} - {course.time.end}
                      </p>
                    </td>
                    <td className="min-w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.instructor}
                      </p>
                    </td>
                    <td className="min-w-[50px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => toggleCourseDetail(course._id)}
                        >
                          {' '}
                          {extendDetail ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="my-1 flex justify-around">
                        <button
                          onClick={() => {
                            cancelBookedCourse(course);
                            setCourseCancel(true);
                          }}
                          className="rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 p-2 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                        >
                          Cancel Course
                        </button>
                      </div>
                    </td>
                  </tr>
                  {extendDetail === course._id && (
                    <tr>
                      <td colSpan={7}>
                        <div className="bg-gray-100 border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out">
                          <table className="w-full table-auto ">
                            <thead>
                              <tr className="bg-gray-200 text-left dark:bg-gray-600">
                                <th className="py-1 px-4 text-sm font-bold text-black dark:text-white">
                                  Detail
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-gray-50 dark:bg-gray-800">
                                <td className="py-3 px-4 xl:pl-8">
                                  <div className="w-full">
                                    {course.description}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookedCourses;
