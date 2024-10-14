import React from 'react';
import { CourseTemplate } from '../../../../custom.Types/courseTemplatesType';
import { handleDeleteTemplate } from './TemplateRequests';

interface TemplateCardProps {
  template: CourseTemplate;
  openForm: (course: CourseTemplate) => void;
  setTemplateChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCourse: React.Dispatch<React.SetStateAction<CourseTemplate | null>>;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  openForm,
  setTemplateChanged
}) => {
  return (
    <div className="bg-white min-w-[250px] max-w-[280px] col-span-6 md:col-span-4 xl:col-span-3 rounded-lg shadow-lg p-3 flex flex-col justify-between">
      <h3 className="text-lg font-bold">{template.courseName}</h3>
      <img src={template.coursePic} alt={template.courseName} className="w-full h-40 object-cover rounded-lg mt-2" />
      <p className="text-sm">{template.instructor}</p>
      <div className="flex gap-2">
        <p className="text-sm">{template.weekday}</p>
        <p className="text-sm">
          {template.time.start} - {template.time.end}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => openForm(template)}
          className="bg-primary text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDeleteTemplate(template, setTemplateChanged);
          }}
          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
