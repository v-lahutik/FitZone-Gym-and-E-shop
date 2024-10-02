import { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../../utils/URL';
import CourseCardForAdmin from './CourseCardForAdmin';
import CourseForm from './CourseForm';

export interface Course {
  courseName: string;
  description: string;
  instructor: string;
  date:string;
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
  participants: []
  category: ('Flexibility' | 'Strength' | 'Cardio')[]; //takes 1 or more values in an array
  _id: string;
}

const CourseCardDisplay: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(
    null
  );

  // Handle opening the form (either for new course or existing course)
  const openForm = (course: Course | null) => {
    setCurrentCourse(course);
    setIsFormOpen(true);
    setIsEditing(course === null); // Edit mode if new course
  };

  const closeForm = () => {
    setCurrentCourse(null);
    setIsFormOpen(false);
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch course template data
    const fetchCourses = async () => {
      try {
        const response = await axios({
          url: `${URL}/admin/courses`,
          method: 'GET',
          withCredentials: true
        });
        const data = response.data.allCourses;
        console.log(data);
        setCourses(data);
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

    fetchCourses();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex flex-wrap justify-center">
          <div className="col-span-12 text-center">
            <h1 className="text-3xl font-bold text-white">Course</h1>
          </div>
          {courses.map((course) => (
            <CourseCardForAdmin
              key={course._id}
              course={course}
              openForm={openForm}
            
              setCurrentCourse={setCurrentCourse}
            />
          ))}
          <div className="col-span-12 text-start">
            <button
              onClick={() => openForm(null)}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Create New Course
            </button>
          </div>{' '}
        </div>
        {isFormOpen && (
          <CourseForm
            isEditing={isEditing}
            course={currentCourse}
            closeForm={closeForm}
          />
        )}
      </div>
    </>
  );
};

export default CourseCardDisplay;
