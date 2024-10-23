import React, { useContext, useEffect, useState } from 'react';
import {
  weekdays,
  timeSlots
} from '../../Admin/Courses/CourseTable/TimeSlots.ts';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { DateContext } from '../../../context/DateContext.tsx';
import { UserContext } from '../../../context/UserContext.tsx';
import { URL } from '../../../utils/URL.ts';
import CourseCardForMember from './CourseCardForMember.tsx';
import { Course } from '../../../custom.Types/courseType.tsx';

const MembersCourseTable: React.FC = () => {
  const dateContext = useContext(DateContext);
  const { getStartOfWeek, getEndOfWeek } = dateContext || {};
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getStartOfWeek(new Date())
  );
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentDay, setCurrentDay] = useState<string>('');
  const userContext = useContext(UserContext);
  const userId = userContext?.user?._id;
  const [weeklyCourses, setWeeklyCourses] = useState<Course[]>([]); // set weekly courses from database
  const [dailyCourses, setDailyCourses] = useState<Course[]>([]); // set daily courses from weekly courses
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false); // check the Card opened or not
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null); // Handle opening the Card (either for new course or existing course)
  const [courseBooked, setCourseBooked] = useState<boolean>(false); // Handle the change in course for re-fetch
  const [isPast, setIsPast] = useState<boolean>(false); // to check the date of course is already in the past
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to handle resizing
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // switch to daily view on mobile
    };
    // Initialize the resize listener
    window.addEventListener('resize', handleResize);
    // Call handler immediately to set the initial state
    handleResize();
    // Cleanup the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCoursesForWeek = async (startDate: Date, endDate: Date) => {
    console.log('fetching courses');
    try {
      setIsLoading(true);
      const response = await axios({
        url: `${URL}/users/courses`,
        method: 'GET',
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        },
        withCredentials: true
      });
      const data = await response.data.allCoursesForWeek;
      setWeeklyCourses(data);

      const dailyCourses = data.filter((course: Course) => {
        return course.weekday === currentDay;
      });
      setDailyCourses(dailyCourses);
      setCourseBooked(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error fetching courseTemplates data',
          error.response?.data
        );
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  useEffect(() => {
    fetchCoursesForWeek(currentWeekStart, getEndOfWeek(currentWeekStart));
  }, [currentWeekStart, courseBooked]);

  useEffect(() => {
    const dailyCourses = weeklyCourses.filter((course: Course) => {
      return course.weekday === currentDay;
    });
    setDailyCourses(dailyCourses);
    setIsLoading(false);
  }, [currentDay, weeklyCourses]);

  useEffect(() => {
    setCurrentDay(
      currentDate.getDay() === 0
        ? weekdays[6]
        : weekdays[currentDate.getDay() - 1]
    );
  }, [currentDate]);

  // Function to navigate between days in daily view
  const handleDayChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1); // Go to the previous day
    } else if (direction === 'next') {
      newDate.setDate(currentDate.getDate() + 1); // Go to the previous day
    }
    setCurrentDate(newDate);
    setCurrentDay(weekdays[newDate.getDay()]);

    //check if the new date is within the current week
    const startOfWeek = getStartOfWeek(newDate);
    if (startOfWeek.getTime() !== currentWeekStart.getTime()) {
      setCurrentWeekStart(startOfWeek);
    }
  };

  const handlePreviousWeek = () => {
    const previousWeekStart = new Date(currentWeekStart); //get current monday
    previousWeekStart.setDate(previousWeekStart.getDate() - 7); //set to previous monday
    setCurrentWeekStart(previousWeekStart);
  };

  const handleNextWeek = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeekStart);
  };

  // to check if the date is in the past
  const checkDate = (date: string) => {
    const present = new Date();
    if (present.getTime() > new Date(date).getTime()) {
      setIsPast(true);
    } else {
      setIsPast(false);
    }
  };

  //  calculate which rows the course spans based on time
  const getCoursePosition = (start: string, end: string) => {
    //get index of start and end time
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    return { startIndex, endIndex };
  };

  //create a set to keep track of already spanned rows (so we don't render them again)
  const weeklySpannedCells = new Set<string>();
  const dailySpannedCells = new Set<string>();

  const openCard = (course: Course | null) => {
    setCurrentCourse(course);
    setIsCardOpen(true);
  };
  const closeCard = () => {
    setCurrentCourse(null);
    setIsCardOpen(false);
  };

  // Render weekly or daily view based on the current screen size
  const renderTable = () => {
    if (isMobileView) {
      return (
        <div>
          {/* Render the table only for the current day */}
          <div className="daily-view">
            <>
              {isCardOpen && currentCourse && (
                <CourseCardForMember
                  course={currentCourse}
                  closeCard={closeCard}
                  setCourseBooked={setCourseBooked}
                  setCurrentCourse={setCurrentCourse}
                  isPast={isPast}
                />
              )}
              <div className="flex justify-around items-center mb-4">
                <FaArrowLeft
                  onClick={() => handleDayChange('prev')}
                  className="cursor-pointer"
                />
                <div>
                  <p>Courses for {currentDate.toDateString()}</p>
                </div>
                <FaArrowRight
                  onClick={() => handleDayChange('next')}
                  className="cursor-pointer"
                />
              </div>
              <div className="p-4">
                {/* <CourseCardDisplay /> */}
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="w-1/12 p-2 bg-primary text-white border border-gray-300">
                        Time
                      </th>

                      <th
                        key={currentDay}
                        className="p-2 bg-primary text-white border border-gray-300"
                      >
                        {currentDay}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*loop over time slots to create rows*/}
                    {!isLoading &&
                      timeSlots.map((slot, rowIndex) => {
                        //find course for current slot
                        const courseForSlot = dailyCourses.find(
                          (course) =>
                            course.weekday === currentDay &&
                            getCoursePosition(
                              course.time.start,
                              course.time.end
                            ).startIndex === rowIndex //check if course start time matches current slot
                        );
                        const cellKey = `${currentDay}-${rowIndex}`;

                        const isSpanned = dailySpannedCells.has(cellKey);

                        return (
                          <tr key={slot}>
                            <td className="p-1 text-center text-xs border bg-white border-gray-300">
                              {slot}
                            </td>
                            {!isSpanned && courseForSlot
                              ? (() => {
                                  const { startIndex, endIndex } =
                                    getCoursePosition(
                                      courseForSlot.time.start,
                                      courseForSlot.time.end
                                    );
                                  const rowSpan = endIndex - startIndex;
                                  // Mark cells that are spanned by this course
                                  for (let i = startIndex; i < endIndex; i++) {
                                    dailySpannedCells.add(`${currentDay}-${i}`);
                                  }

                                  return (
                                    <td
                                      key={`${currentDay}-${slot}`}
                                      className={`p-2 text-center ${
                                        userId &&
                                        courseForSlot.participants.includes(
                                          userId
                                        )
                                          ? 'bg-blue-300'
                                          : 'bg-blue-100'
                                      } border border-gray-300`}
                                      rowSpan={rowSpan}
                                    >
                                      <div
                                        onClick={() => {
                                          openCard(courseForSlot);
                                          checkDate(courseForSlot.date);
                                        }}
                                        className="bg-white shadow rounded-lg p-2 hover:cursor-pointer hover:bg-green-200 duration-300 ease-in-out"
                                      >
                                        <h3 className="text-sm font-semibold text-primary">
                                          {courseForSlot.courseName}
                                        </h3>
                                        <p className="text-xs block md:hidden lg:block">
                                          Instructor: {courseForSlot.instructor}
                                        </p>
                                        <p className="text-xs block md:hidden lg:block">
                                          Participants:{' '}
                                          {`${courseForSlot.participants.length} / ${courseForSlot.maxParticipants}`}
                                        </p>
                                      </div>
                                    </td>
                                  );
                                })()
                              : !isSpanned && (
                                  <td className="p-2 text-center border bg-gray-100 border-gray-300"></td>
                                )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
      );
    } else {
      // Weekly view rendering
      return (
        <div className="weekly-view">
          <>
            {isCardOpen && currentCourse && (
              <CourseCardForMember
                course={currentCourse}
                closeCard={closeCard}
                setCourseBooked={setCourseBooked}
                setCurrentCourse={setCurrentCourse}
                isPast={isPast}
              />
            )}
            <div className="flex justify-around items-center mb-4">
              <FaArrowLeft
                onClick={handlePreviousWeek}
                className="cursor-pointer"
              />
              <div>
                {currentWeekStart.toDateString()} -{' '}
                {getEndOfWeek(currentWeekStart).toDateString()}
              </div>
              <FaArrowRight
                onClick={handleNextWeek}
                className="cursor-pointer"
              />
            </div>
            <div className="p-4">
              {/* <CourseCardDisplay /> */}
              <table className="min-w-full table-fixed border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="w-1/12 p-2 bg-primary text-white border border-gray-300">
                      Time
                    </th>
                    {weekdays.map((day) => (
                      <th
                        key={day}
                        className="p-2 bg-primary text-white border border-gray-300"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/*loop over time slots to create rows*/}
                  {timeSlots.map((slot, rowIndex) => {
                    return (
                      <tr key={slot}>
                        <td className="p-1 text-center text-xs border bg-white border-gray-300 ">
                          {slot}
                        </td>
                        {/*loop over weekdays to create columns for this row*/}
                        {weekdays.map((day, dayIndex) => {
                          {
                            /*check if cell is already spanned*/
                          }
                          const cellKey = `${day}-${rowIndex}`;
                          if (weeklySpannedCells.has(cellKey)) {
                            return null;
                          }

                          {
                            /*find course for current slot and day*/
                          }

                          const courseForSlot = weeklyCourses.find(
                            (course) =>
                              weekdays.indexOf(course.weekday) === dayIndex &&
                              getCoursePosition(
                                course.time.start,
                                course.time.end
                              ).startIndex === rowIndex //check if course start time matches current slot
                          );

                          if (courseForSlot) {
                            const { startIndex, endIndex } = getCoursePosition(
                              courseForSlot.time.start,
                              courseForSlot.time.end
                            );
                            const rowSpan = endIndex - startIndex; //calculate row span - usually 2

                            //add cells (slot) to spannedCells set - not to be rendered again in next row
                            for (let i = startIndex; i < endIndex; i++) {
                              weeklySpannedCells.add(`${day}-${i}`);
                            }

                            return (
                              <>
                                <td
                                  key={`${day}-${slot}`}
                                  className={`p-2 text-center ${
                                    userId! &&
                                    courseForSlot?.participants?.includes(
                                      userId
                                    )
                                      ? 'bg-blue-300'
                                      : 'bg-blue-100'
                                  }  border border-gray-300`}
                                  rowSpan={rowSpan}
                                >
                                  <div
                                    onClick={() => {
                                      openCard(courseForSlot);
                                      checkDate(courseForSlot.date);
                                    }}
                                    className="bg-white shadow rounded-lg p-2 hover:cursor-pointer hover:bg-green-200 duration-300 ease-in-out"
                                  >
                                    <h3 className="text-sm font-semibold text-primary">
                                      {courseForSlot.courseName}
                                    </h3>
                                    <p className="text-xs hidden lg:block">
                                      Instructor: {courseForSlot.instructor}
                                    </p>
                                    {/* edit this part for display participants/max participants */}
                                    <p className="text-xs hidden lg:block">
                                      Participants:{' '}
                                      {`${courseForSlot.participants.length} / ${courseForSlot.maxParticipants}`}
                                    </p>
                                  </div>
                                </td>
                              </>
                            );
                          }

                          return (
                            <td
                              key={`${day}-${slot}`}
                              className="p-2 text-center border bg-gray-100 border-gray-300"
                            ></td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>{' '}
          </>
        </div>
      );
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return renderTable();
};

export default MembersCourseTable;
