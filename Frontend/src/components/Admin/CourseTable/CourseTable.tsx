import React, { useContext, useEffect, useState } from 'react';
import { weekdays, timeSlots } from './TimeSlots.ts';
import CourseCardDisplay from './CourseCardDisplay';
import { DateContext } from '../../../context/DateContext';
import axios from 'axios';
import { URL } from '../../../utils/URL.ts';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export interface Course {
  coursePic: string;
  courseName: string;
  description: string;
  instructor: string;
  date: string;
  time: {
    start: string;
    end: string;
  };
  weekday:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  maxParticipants: number;
  participants: [];
  category: ('Flexibility' | 'Strength' | 'Cardio')[]; //takes 1 or more values in an array
  _id: string;
}

const CourseTable: React.FC = () => {
  const dateContext = useContext(DateContext);
  const { getStartOfWeek, getEndOfWeek } = dateContext || {};
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getStartOfWeek(new Date())
  );
  const [courses, setCourses] = useState<Course[]>([]); // set weekly courses from database
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false); // check the Card opened or not
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null); // Handle opening the Card (either for new course or existing course)
  const [courseChanged, setCourseChanged] = useState<boolean>(false); // Handle the change in course for re-fetch

  const fetchCoursesForWeek = async (startDate: Date, endDate: Date) => {
    try {
      const response = await axios({
        url: `${URL}/admin/courses`,
        method: 'GET',
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        },
        withCredentials: true
      });
      const data = response.data.allCoursesForWeek;
      setCourses(data);
      setCourseChanged(false);
      console.log('Courses for week', data);
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

  //calculate the current week and fetch courses for that week
  useEffect(() => {
    const startOfWeek = currentWeekStart;
    const endOfWeek = getEndOfWeek(startOfWeek);
    fetchCoursesForWeek(startOfWeek, endOfWeek);
  }, [currentWeekStart, courseChanged]);

  //  calculate which rows the course spans based on time
  const getCoursePosition = (start: string, end: string) => {
    //get index of start and end time
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    return { startIndex, endIndex };
  };

  //create a set to keep track of already spanned rows (so we don't render them again)
  const spannedCells = new Set<string>();

  const openCard = (course: Course | null) => {
    setCurrentCourse(course);
    setIsCardOpen(true);
  };
  const closeCard = () => {
    setCurrentCourse(null);
    setIsCardOpen(false);
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

  return (
    <>
      {isCardOpen && currentCourse && (
        <CourseCardDisplay
          course={currentCourse}
          closeCard={closeCard}
          setCourseChanged={setCourseChanged}
          setCurrentCourse={setCurrentCourse}
        />
      )}
      <div className="flex justify-around items-center mb-4">
        <FaArrowLeft onClick={handlePreviousWeek} className="cursor-pointer" />
        <div>
          {currentWeekStart.toDateString()} -{' '}
          {getEndOfWeek(currentWeekStart).toDateString()}
        </div>
        <FaArrowRight onClick={handleNextWeek} className="cursor-pointer" />
      </div>
      <div className="overflow-x-auto p-4">
        {/* <CourseCardDisplay /> */}
        <table className="min-w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="w-1/12 p-2 bg-primary text-white border border-gray-300 sticky left-0">
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
                  <td className="p-1 text-center text-xs border bg-white border-gray-300 sticky left-0 ">
                    {slot}
                  </td>
                  {/*loop over weekdays to create columns for this row*/}
                  {weekdays.map((day, dayIndex) => {
                    {
                      /*check if cell is already spanned*/
                    }
                    const cellKey = `${day}-${rowIndex}`;
                    if (spannedCells.has(cellKey)) {
                      return null;
                    }

                    {
                      /*find course for current slot and day*/
                    }

                    const courseForSlot = courses.find(
                      (course) =>
                        weekdays.indexOf(course.weekday) === dayIndex &&
                        getCoursePosition(course.time.start, course.time.end)
                          .startIndex === rowIndex //check if course start time matches current slot
                    );

                    if (courseForSlot) {
                      const { startIndex, endIndex } = getCoursePosition(
                        courseForSlot.time.start,
                        courseForSlot.time.end
                      );
                      const rowSpan = endIndex - startIndex; //calculate row span - usually 2

                      //add cells (slot) to spannedCells set - not to be rendered again in next row
                      for (let i = startIndex; i < endIndex; i++) {
                        spannedCells.add(`${day}-${i}`);
                      }

                      return (
                        <>
                          <td
                            key={`${day}-${slot}`}
                            className="p-2 text-center bg-blue-100 border border-gray-300"
                            rowSpan={rowSpan}
                          >
                            <div
                              onClick={() => openCard(courseForSlot)}
                              className="bg-white shadow rounded-lg p-2 hover:cursor-pointer hover:bg-red-100 duration-300 ease-in-out"
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
  );
};

export default CourseTable;
