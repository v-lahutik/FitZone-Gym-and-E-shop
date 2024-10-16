import React from 'react';
import Yoga from '../../../assets/images/Courses/yoga.jpg';
import { FaRegClock } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { ImUsers } from 'react-icons/im';
import { Course } from './MembersCourseTable';
import { useContext } from 'react';
import { bookNewCourse, cancelBookedCourse } from './BookingRequest';
import { UserContext } from '../../../context/UserContext';
import { render } from 'react-dom';

interface CourseCardForMemberProps {
  course: Course;
  closeCard: () => void;
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  setCourseBooked: React.Dispatch<React.SetStateAction<boolean>>;
  isPast: boolean;
}

const CourseCardForMember: React.FC<CourseCardForMemberProps> = ({
  course,
  closeCard,
  setCourseBooked,
  isPast
}) => {
  const { user } = useContext(UserContext) || {};

  const renderButton = () => {
    if (isPast) {
      return (
        <button
          disabled={true}
          className="rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 p-3 opacity-50"
        >
          can not book
        </button>
      );
    }
    if (course.participants.includes(user?._id)) {
      return (
        <button
          onClick={async () => {
            await cancelBookedCourse(course);
            setCourseBooked(false);
            closeCard();
          }}
          className="rounded-lg bg-gradient-to-r from-primary via-primary to-red-500 p-3 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        >
          Cancel booking
        </button>
      );
    } else {
      return <button
        onClick={async () => {
          await bookNewCourse(course);
          setCourseBooked(true);
          closeCard();
        }}
        className="rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 p-3 hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        Book now
      </button>;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
        <div className="w-[450px] m-auto border-gray-300 rounded-lg p-2 bg-blight shadow-xl">
          <div className="text-end">
            <button onClick={() => closeCard()} className="text-red-500">
              X Close
            </button>
          </div>
          <img
            alt=""
            src={course.coursePic || Yoga}
            className="h-[340px] w-full rounded-md object-cover"
          />

          <div className="mt-4">
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
                  {course.category.length === 1 ? (
                    <p>{course.category[0]}</p>
                  ) : (
                    <p>{`${course.category[0]}, ${course.category[1]}`}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-around gap-5 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-gray-600">
                <FaRegClock className="text-lg" />
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">
                    {course.weekday} : {course.date.slice(0, 10)}
                  </p>
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
            <div className="m-4 flex justify-around">
              <p className="text-center text-gray-600">{course.description}</p>
            </div>
            <div className="my-4 flex justify-around">{renderButton()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCardForMember;
