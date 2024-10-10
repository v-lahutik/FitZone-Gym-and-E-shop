export interface CourseTemplate {
  courseName: string;
  coursePic: string;
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