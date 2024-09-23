import React from 'react';

interface Course {
  name: string;
  category: string[];
  weekday: string;
  time: { start: string; end: string };
  maxParticipants: number;
  description: string;
  instructor: string;
}

const timeSlots = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00'
];

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const courses: Course[] = [
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Monday',
    time: { start: '10:30', end: '11:30' },
    maxParticipants: 15,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Sunday',
    time: { start: '12:30', end: '13:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Tuesday',
    time: { start: '18:30', end: '19:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Thursday',
    time: { start: '12:30', end: '13:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Wednesday',
    time: { start: '12:30', end: '13:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Friday',
    time: { start: '12:30', end: '13:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  },
  {
    name: 'Yoga Flow',
    category: ['flexibility'],
    weekday: 'Saturday',
    time: { start: '12:30', end: '13:30' },
    maxParticipants: 12,
    description:
      'A calming yoga flow to improve flexibility and reduce stress.',
    instructor: 'Jane Smith'
  }
];

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
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="w-1/12 p-2 bg-gray-100 border border-gray-300">
              Time
            </th>
            {weekdays.map((day) => (
              <th key={day} className="p-2 bg-gray-100 border border-gray-300">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*loop over time slots to create rows*/}
          {timeSlots.map((slot, rowIndex) => (
            <tr key={slot}>
              <td className="p-2 text-center border text-white border-gray-300">
                {slot}
              </td>
              {/*loop over weekdays to create columns for this row*/}
              {weekdays.map((day, dayIndex) => {
               {/*check if cell is already spanned*/}
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
                        <h3 className="font-semibold text-primary">
                          {courseForSlot.name}
                        </h3>
                        <p className="text-sm">
                          Instructor: {courseForSlot.instructor}
                        </p>
                        {/* edit this part for display participants/max participants */}
                        <p className="text-sm">
                          Max Participants: {courseForSlot.maxParticipants}
                        </p>
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    key={`${day}-${slot}`}
                    className="p-2 text-center border border-gray-300"
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
