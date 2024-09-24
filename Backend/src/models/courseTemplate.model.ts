import { Schema, model, Document } from "mongoose";

export interface CourseTemplateInput {
  courseName: string;
  category: string[];
  weekday: string;
  time: { start: string; end: string };
  maxParticipants: number;
  description?: string;
  instructor?: string;
}

export interface CourseTemplateDocument extends CourseTemplateInput, Document {
  participants?: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const courseTemplateSchema = new Schema<CourseTemplateDocument>(
  {
    courseName: { type: String, required: true },
    category: { type: [String], required: true },
    weekday: { type: String, required: true },
    time: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    maxParticipants: { type: Number, required: true },
    description: String,
    instructor: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const CourseTemplate = model<CourseTemplateDocument>(
  "CourseTemplate",
  courseTemplateSchema
);
export default CourseTemplate;
