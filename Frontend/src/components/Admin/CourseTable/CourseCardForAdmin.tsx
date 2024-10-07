import React from 'react';
import Yoga from '../../../assets/images/Courses/yoga.jpg';
import { FaRegClock } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { ImUsers } from 'react-icons/im';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { handleDeleteCourse } from './CourseRequest';
import { Course } from './CourseTable';

interface CourseCardForAdminProps {
  course: Course;
  openForm: (course: Course) => void;
  closeCard: (course: Course) => void;
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const CourseCardForAdmin: React.FC<CourseCardForAdminProps> = ({
  course,
  openForm,
  closeCard
}) => {
  return (
    <>
      <div className="w-[320px] m-auto text-white border border-gray-300 rounded-lg p-2 bg-blight shadow-xl">
        <img
          alt=""
          src={Yoga}
          className="h-56 w-full rounded-md object-cover"
        />
        
        <div className="mt-2">
          <div className="flex justify-around">
            <div>
              <div>
                <p className="text-sm text-gray-500">{course.instructor}</p>
              </div>

              <div>
                <dd className="font-medium text-primary">
                  {course.courseName}
                </dd>
              </div>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 text-gray-600">
              <FaHeartPulse className="text-lg" />

              <div className="mt-1.5 sm:mt-0 text-sm">
                <p className="text-gray-500 ">Category</p>

                <p>{course.category}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-around gap-5 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-gray-600">
              <FaRegClock className="text-lg" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">{course.date.slice(0, 10)}</p>
                <p className="text-gray-500">{course.weekday}</p>
                <p className="font-medium">
                  {course.time.start} - {course.time.end}
                </p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-gray-600">
              <ImUsers className="text-lg" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Participants</p>
                <p className="font-medium">
                  {course.participants.length}/{course.maxParticipants}
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 flex justify-around">
            <button
              onClick={() => openForm(course)}
              className="py-3 px-5 mx-3 rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteCourse(course)}
              className="py-3 px-5 mx-3 rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>
        <button onClick={() => closeCard(course)} className="text-red-500">
          X Close
        </button>
      </div>
    </>
  );
};

export default CourseCardForAdmin;
