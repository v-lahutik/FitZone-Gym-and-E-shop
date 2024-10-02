import { useState } from 'react';
// import axios from 'axios';
// import { URL } from '../../../utils/URL';
import CourseCardForAdmin from './CourseCardForAdmin';
import CourseForm from './CourseForm';
import { Course } from './CourseTable';


interface CourseCardDisplayProps {
  course: Course;
  closeCard: (course: Course) => void;
  setCurrentCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

const CourseCardDisplay: React.FC<CourseCardDisplayProps> = ({ course ,closeCard, setCurrentCourse}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // s

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

  return (
    <>
    <div className='fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50'>
      <div className="p-4">
        <div className="flex flex-wrap justify-center">
          <CourseCardForAdmin
            course={course}
            openForm={openForm}
            setCurrentCourse={setCurrentCourse}
            closeCard={closeCard}
          />
        </div>
        {isFormOpen && (
          <CourseForm
            isEditing={isEditing}
            course={course}
            closeForm={closeForm}
          />
        )}
      </div>
      </div>
    </>
  );
};

export default CourseCardDisplay;
