import { Schema, model, Document } from "mongoose";

export interface CourseInput {
  courseName: string;
  category: string[];
  weekday: string;
  date: Date;
  time: { start: string; end: string };
  maxParticipants: number;
  description?: string;
  instructor?: string
  participants?: string[];
}

export interface CourseDocument extends CourseInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<CourseDocument>({
    courseName: { type: String, required: true },
    category: { type: [String], required: true },
    weekday: { type: String, required: true },
    date: { type: Date, required: true },
    time: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    maxParticipants: { type: Number, required: true },
    description: String,
    instructor: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },{ timestamps: true }
);

const Course = model<CourseDocument>("Course", courseSchema);
export default Course;
