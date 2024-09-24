import React from 'react';
import Yoga from '../../../assets/images//Courses/yoga.jpg';
import { FaRegClock } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { ImUsers } from 'react-icons/im';

interface CourseCardProps {
  id: string;
  name: string;
  instructor: string;
  description: string;
  maxParticipants: number;
  participants: string[];
  category: string[];
  time: { start: string; end: string };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <>
      <div className="w-[280px] m-auto text-white border border-gray-300 rounded-lg p-2 bg-blight shadow-xl">
        <img
          alt=""
          src={Yoga}
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <div className="flex justify-between">
            <div>
              <div>
                <p className="text-sm text-gray-500">Instructor </p>
              </div>

              <div>
                <dd className="font-medium text-primary">Course Name</dd>
              </div>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 text-gray-600">
              <FaHeartPulse className="text-lg" />

              <div className="mt-1.5 sm:mt-0 text-sm">
                <p className="text-gray-500 ">Category</p>

                <p>CourseCategory</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-5 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-gray-600">
              <FaRegClock className="text-lg" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Weekday</p>

                <p className="font-medium">Time</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 text-gray-600">
              <ImUsers className="text-lg" />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Participants</p>

                <p className="font-medium">0/15</p>
              </div>
            </div>

            <button className="max-h-10 rounded-lg bg-gradient-to-r from-primary via-primary to-yellow-500 p-1 hover:text-white focus:outline-none focus:ring active:text-opacity-75">
              Book now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
