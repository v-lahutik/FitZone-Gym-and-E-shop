import React, { useState } from 'react';
import { CourseTemplate } from '../../../../custom.Types/courseTemplatesType';
import { weekdays, timeSlots } from '../CourseTable/TimeSlots';
import {
  handleSaveNewTemplate,
  handleUpdateTemplate
} from './TemplateRequests';

interface CourseFormProps {
  course: CourseTemplate | null;
  closeForm: () => void;
  isEditing: boolean;
}

const CourseTemplateForm: React.FC<CourseFormProps> = ({
  course,
  closeForm,
  isEditing
}) => {
  const [localCourse, setLocalCourse] = useState<CourseTemplate>(
    course || {
      _id: '',
      courseName: '',
      description: '',
      instructor: '',
      time: {
        start: '08:00',
        end: '08:00'
      },
      weekday: 'Monday',
      maxParticipants: 0,
      category: [],
      coursePic: ''
    }
  );

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'start' || name === 'end') {
      setLocalCourse({
        ...localCourse,
        time: { ...localCourse.time, [name]: value }
      });
    } else {
      setLocalCourse({ ...localCourse, [name]: value });
    }
  };

  // Handle checkbox changes for categories
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as {
      value: 'Strength' | 'Cardio' | 'Flexibility';
    };
    setLocalCourse((prevCourse) => ({
      ...prevCourse,
      category: prevCourse.category.includes(value)
        ? prevCourse.category.filter((cat) => cat !== value) // Remove if already selected
        : [...prevCourse.category, value] // Add if not selected
    }));
  };

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded w-1/3">
          <div className="flex justify-between items-center">
            <h3 className="text-xl">
              {course ? 'Course Details' : 'Create New Course'}
            </h3>
            <button onClick={closeForm} className="text-red-500">
              Close
            </button>
          </div>
          <div className="mt-4">
            <label>Course Name</label>
            <input
              name="courseName"
              type="text"
              value={localCourse.courseName}
              onChange={handleChange}
              className="w-full border px-2 py-1"
            />
             <label>Course Picture</label>
            <input
              name="coursePic"
              type="text"
              value={localCourse.coursePic}
              onChange={handleChange}
              className="w-full border px-2 py-1"
            />

            <label>Category</label>
            <div className="flex justify-around my-1">
              <div key={'Strength'}>
                <label>
                  <input
                    type="checkbox"
                    value={'Strength'}
                    checked={localCourse.category.includes('Strength')}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {'Strength'}
                </label>
              </div>
              <div key={'Cardio'}>
                <label>
                  <input
                    type="checkbox"
                    value={'Cardio'}
                    checked={localCourse.category.includes('Cardio')}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {'Cardio'}
                </label>
              </div>
              <div key={'Flexibility'}>
                <label>
                  <input
                    type="checkbox"
                    value={'Flexibility'}
                    checked={localCourse.category.includes('Flexibility')}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  {'Flexibility'}
                </label>
              </div>
            </div>

            <label>Description</label>
            <input
              name="description"
              type="text"
              value={localCourse.description}
              onChange={handleChange}
              className="w-full border px-2 py-1"
            />
            <div className="flex justify-between">
              <div className="w-1/2 flex flex-col">
                <label>Instructor</label>
                <input
                  name="instructor"
                  type="text"
                  value={localCourse.instructor}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                />
              </div>

              <div className="w-1/3 flex flex-col">
                <label>Weekday</label>

                <select
                  name="weekday"
                  value={localCourse.weekday}
                  onChange={handleChange}
                  id=""
                  className="w-full border px-2 py-1"
                >
                  {weekdays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label>Starting Time</label>
                <select
                  name="start"
                  value={localCourse.time.start}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label>End Time</label>
                <select
                  name="end"
                  value={localCourse.time.end}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>{' '}
              <div className="flex flex-col">
                <label>Max Participants</label>
                <input
                  name="maxParticipants"
                  type="number"
                  value={localCourse.maxParticipants}
                  onChange={handleChange}
                  className="w-full border px-2 py-1"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              {!isEditing && (
               <div>
               <button
                  onClick={() => handleUpdateTemplate(localCourse, closeForm)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save changes
                </button>
                   <button
                   onClick={() => handleSaveNewTemplate(localCourse, closeForm)}
                   className="bg-primary text-white px-4 py-2 rounded ml-2"
                 >
                   Save as new Course
                 </button></div>
              )}
              {isEditing && (
                <button
                  onClick={() => handleSaveNewTemplate(localCourse, closeForm)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save new Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTemplateForm;
