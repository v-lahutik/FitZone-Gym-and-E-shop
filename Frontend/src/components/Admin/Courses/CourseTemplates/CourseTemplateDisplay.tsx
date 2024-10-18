import { useEffect, useState } from 'react';
import CourseTemplateForm from './CourseTemplateForm';
import TemplateCard from './TemplateCard';
import axios from 'axios';
import { URL } from '../../../../utils/URL';
import { CourseTemplate } from '../../../../custom.Types/courseTemplatesType';

const CourseTemplateDisplay: React.FC = () => {
  const [templates, setTemplates] = useState<CourseTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<CourseTemplate[]>(
    []
  );
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<CourseTemplate | null>(
    null
  );
  const [templateChanged, setTemplateChanged] = useState<boolean>(false);
  const [filterName, setFilterName] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterWeekday, setFilterWeekday] = useState<string>('');

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
    setTemplateChanged(true);
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
        setFilteredTemplates(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Error fetching courseTemplates data',
            error.response?.data
          );
        } else {
          console.error('Unexpected error', error);
        }
      } finally {
        setTemplateChanged(false);
      }
    };
    fetchCourseTemplates();
  }, [templateChanged]);

  useEffect(() => {
    let filtered = templates;

    if (filterName) {
      filtered = filtered.filter((template) => {
        return (
          template.courseName
            .toLowerCase()
            .includes(filterName.toLowerCase()) ||
          template.instructor.toLowerCase().includes(filterName.toLowerCase())
        );
      });
    }
    if (filterCategory) {
      filtered = filtered.filter((template) => {
        if (filterCategory.toLowerCase() === 'cardio')
          return template.category.includes('Cardio');
        if (filterCategory.toLowerCase() === 'strength')
          return template.category.includes('Strength');
        if (filterCategory.toLowerCase() === 'flexibility')
          return template.category.includes('Flexibility');
      });
    }
    if (filterWeekday) {
      filtered = filtered.filter((template) => {
        return template.weekday === filterWeekday;
      });
    }
    setFilteredTemplates(filtered);
  }, [filterName, filterCategory, filterWeekday, templates]);

  return (
    <>
      <div className="p-4">
        <div className="col-span-12 text-center">
          <h1 className="text-3xl mb-8 font-bold text-black">
            Course Templates
          </h1>
        </div>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Filter by course name or instructor"
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          >
            <option value="">Filter by category</option>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
          </select>

          <select
            value={filterWeekday}
            onChange={(e) => setFilterWeekday(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 shadow-sm hover:border-gray-400"
          >
            <option value="">Filter by Weekday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <button
            onClick={() => openForm(null)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create New Course
          </button>
        </div>

        <div className="grid grid-cols-12 gap-3 overflow-x-auto">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template._id}
              setTemplateChanged={setTemplateChanged}
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
