import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
interface DateContextType {
  currentDate: Date;
  currentWeekStart: Date;
  setCurrentDate: (date: Date) => void;
  setCurrentWeek: (date: Date) => void;
}

// Create the context with default values
const DateContext = createContext<DateContextType | undefined>(undefined);

// Create a provider component
export const DateProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const dayIndex = start.getDay(); //returns index of current day in week (Sun-Sat = 0-6)
    const currentDay = start.getDate(); //returns current day of month
    const monday = currentDay - dayIndex + (dayIndex === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(start.setDate(monday));
  };

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeek] = useState<Date>(
    getStartOfWeek(new Date())
  );

  return (
    <DateContext.Provider
      value={{ currentDate, currentWeekStart, setCurrentDate, setCurrentWeek }}
    >
      {children}
    </DateContext.Provider>
  );
};

// Custom hook to use the DateContext
export const useDate = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};
