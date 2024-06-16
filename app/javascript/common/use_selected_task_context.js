import React, { createContext, useState, useContext } from "react";

// TaskContext entails currently selected task for Update action
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTaskContext = () => useContext(TaskContext);
// Context provider component
export const TaskContextProvider = ({ children }) => {
  /* For example,
    {
      id: "1",                                    // Id of a task
      title: "Pickup dinner",                     // Title of a task
      status: "To do",                            // Status of a task
      description: "Address of restaurent",       // Description of a task
    }
  */

  const [taskContext, setTaskContext] = useState({
    id: "",
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
