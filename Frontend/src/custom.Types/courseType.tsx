export interface Course {
    coursePic: string;
    courseName: string;
    description: string;
    instructor: string;
    date: string;
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
    participants: [string];
    category: ('Flexibility' | 'Strength' | 'Cardio')[]; //takes 1 or more values in an array
    _id: string;
  }