import React from 'react';
import { CourseTemplate } from './CourseTemplateDisplay';

interface TemplateCardProps {
  template: CourseTemplate;
  closeForm: () => void;
  openForm: (course: CourseTemplate | null) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <div className="bg-white min-w-[200px] max-w-[280px] col-span-6 sm:col-span-4 md:col-span-3 xl:col-span-2 rounded-lg shadow-lg p-3">
      <h3 className="text-lg font-bold">{template.courseName}</h3>
      <p className="text-sm">{template.instructor}</p>
      <div className="flex gap-2">
        <p className="text-sm">{template.weekday}</p>
        <p className="text-sm">
          {template.time.start} - {template.time.end}
        </p>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary text-white px-2 py-1 rounded">
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
