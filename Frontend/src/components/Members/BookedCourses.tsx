import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/URL';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { Course } from './MembersCourseTable';

const BookedCourses: React.FC = () => {
  const [bookedCourses, setBookedCourses] = useState<Course[]>([]);
  const [extendDetail, setExtendDetail] = useState<boolean>(false); // To track the expanded order
  //   const [searchTerm, setSearchTerm] = useState<string>('');

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
          const myBookedCourses = allCourses.filter((course) =>
            course.participants.includes(userID)
          );
          setBookedCourses(myBookedCourses);
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
  }, []);
  console.log(bookedCourses);
  // Toggle order row expansion
  const toggleCourseDetail = () => {
    setExtendDetail(!extendDetail);
  };

  //   const formatDate = (dateString: string) => {
  //     const date = new Date(dateString);
  //     return date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
  //   };

  // Handle search input change
  //   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const term = event.target.value.toLowerCase();
  //     setSearchTerm(term);
  //   };

  //filter orders based order number or product name
  //   const courses = orders.filter((order) => {
  //     const matchesOrderNumber = course.orderNumber
  //       .toLowerCase()
  //       .includes(searchTerm);
  //     const matchesProductName = course.products.some((product) =>
  //       product.productId.productName.toLowerCase().includes(searchTerm)
  //     );

  //     return matchesOrderNumber || matchesProductName; // Return true if either matches
  //   });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className=" max-w-full overflow-x-auto">
        {/* Search input */}
        <div className="relative mb-6 ">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-black">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search by order number or product name..."
            // value={searchTerm}
            // onChange={handleSearch}
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
          />
        </div>
        {bookedCourses.length === 0 ? (
          <p className="text-center py-4">No Booked Course</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-11">
                  Course Name
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Date
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Time
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  Instructor
                </th>
                <th className="min-w-[50px] py-4 px-4 text-sm font-bold  text-black dark:text-white">
                  details
                </th>
                
              </tr>
            </thead>
            <tbody>
              {bookedCourses.map((course, key) => (
                <React.Fragment key={key}>
                  <tr>
                    <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                      <p className="text-sm  text-black dark:text-white">
                        {course.courseName}
                      </p>
                    </td>
                    <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.date.slice(0,10)}
                      </p>
                    </td>
                    <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.time.start} - {course.time.end}
                      </p>
                    </td>
                    <td className="min-w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-sm  text-black dark:text-white">
                        {course.instructor}
                      </p>
                    </td>
                    <td className="min-w-[50px] border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center justify-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => toggleCourseDetail()}
                        >
                          {' '}
                          {extendDetail ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {extendDetail && (
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
