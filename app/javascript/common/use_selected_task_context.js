import React, { createContext, useState, useContext } from "react";

// Create a context
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTaskContext = () => useContext(TaskContext);
// Context provider component
export const TaskContextProvider = ({ children }) => {
  const [taskContext, setTaskContext] = useState({
    title: "",
    status: "To do",
    description: "",
  });

  const sendTaskContext = (value) => {
    setTaskContext(value);
  };

  return (
    <TaskContext.Provider value={{ taskContext, sendTaskContext }}>
      {children}
    </TaskContext.Provider>
  );
};
