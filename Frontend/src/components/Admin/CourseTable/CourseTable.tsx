import React from 'react';
import { courseData } from '../../DummyData/courses';
import { weekdays, timeSlots } from './TimeSlots.ts';
import CourseCard from '../../Members/CourseCard.tsx';

interface Course {
  name: string;
  category: string[];
  weekday: string;
  time: { start: string; end: string };
  maxParticipants: number;
  description: string;
  instructor: string;
}

const courses: Course[] = courseData;


const CourseTable: React.FC = () => {
  //  calculate which rows the course spans based on time
  const getCoursePosition = (start: string, end: string) => {
    //get index of start and end time
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    return { startIndex, endIndex };
  };

  //create a set to keep track of already spanned rows (so we don't render them again)
  const spannedCells = new Set<string>();

  return (
    <>
    <CourseCard />
   
    <div className="overflow-x-auto p-4">
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
                      <td
                        key={`${day}-${slot}`}
                        className="p-2 text-center bg-blue-100 border border-gray-300"
                        rowSpan={rowSpan}
                      >
                        <div className="bg-white shadow rounded-lg p-2">
                          <h3 className="text-sm font-semibold text-primary">
                            {courseForSlot.name}
                          </h3>
                          <p className="text-xs hidden lg:block">
                            Instructor: {courseForSlot.instructor}
                          </p>
                          {/* edit this part for display participants/max participants */}
                          <p className="text-xs hidden lg:block">
                            Max Participants: {courseForSlot.maxParticipants}
                          </p>
                        </div>
                      </td>
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
   
    </div> </>
  );
};

export default CourseTable;
