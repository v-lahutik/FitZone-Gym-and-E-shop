import React, { createContext, ReactNode } from 'react';

// Define the shape of the context
interface DateContextType {
  getStartOfWeek: (date: Date) => Date;
  getEndOfWeek: (date: Date) => Date;
}

// Create the context with default values
export const DateContext = createContext<DateContextType>({} as DateContextType);

// Utility functions to set the time of the date
const setStartOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const setEndOfDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};




// Create a provider component
export const DateProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const dayIndex = start.getDay(); // returns index of current day in week (Sun-Sat = 0-6)
    const currentDay = start.getDate(); // returns current day of month
    const monday = currentDay - dayIndex + (dayIndex === 0 ? -6 : 1); // get to index 1 (Monday)
    return setStartOfDay(new Date(start.setDate(monday)));
  };

  const getEndOfWeek = (date: Date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return setEndOfDay(endOfWeek);
  };

  return (
    <DateContext.Provider value={{ getStartOfWeek, getEndOfWeek }}>
      {children}
    </DateContext.Provider>
  );
};
