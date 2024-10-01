import { useEffect, useState } from 'react';
import CourseTemplateForm from './CourseTemplateForm';
import TemplateCard from './TemplateCard';
import axios from 'axios';
import { URL } from '../../../utils/URL';

export interface CourseTemplate {
  courseName: string;
  description: string;
  instructor: string;
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
  category: ('Flexibility' | 'Strength' | 'Cardio')[]; //takes 1 or more values in an array
  _id: string;
}

const CourseTemplateDisplay: React.FC = () => {
  const [templates, setTemplates] = useState<CourseTemplate[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<CourseTemplate | null>(
    null
  );

  // Handle opening the form (either for new course or existing course)
  const openForm = (course: CourseTemplate | null) => {
    setCurrentCourse(course);
    setIsFormOpen(true);
    setIsEditing(course === null); // Edit mode if new course
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentCourse(null);
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch course template data
    const fetchCourseTemplates = async () => {
      try {
        const response = await axios({
          url: `${URL}/admin/courseTemplates`,
          method: 'GET',
          withCredentials: true
        });
        const data = response.data.allTemplates;
        // console.log(data);
        setTemplates(data);
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

    fetchCourseTemplates();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-12 gap-3 overflow-x-auto">
          <div className="col-span-12 text-center">
            <h1 className="text-3xl font-bold text-white">Course Templates</h1>
          </div>
          {templates.map((template) => (
            <TemplateCard
              key={template._id}
              template={template}
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
          <CourseTemplateForm
            isEditing={isEditing}
            course={currentCourse}
            closeForm={closeForm}
          />
        )}
      </div>
    </>
  );
};

export default CourseTemplateDisplay;
