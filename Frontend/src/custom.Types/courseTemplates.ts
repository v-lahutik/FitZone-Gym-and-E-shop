export type CourseTemplate = {
  _id: string;
  courseName: string;
  description: string;
  duration: number;
  price: number;
  instructor: string;
  time: {
    start: string;
    end: string;
  };
  weekday: string;
  createdAt: string;
  updatedAt: string;
  coursePic: string;
  maxParticipants: number;
  category: [string];
};
