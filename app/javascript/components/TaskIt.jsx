import NavBar from "../permissions/components/navBar";
import React from "react";
import FilterTabs from "../permissions/components/filterTabs";
import TaskForm from "../permissions/components/taskForm";
import { RequestProvider } from "../common/showFormContext";
import { TaskContextProvider } from "../common/useSelectedTaskContext";

// Application
const TaskIt = () => {
  return (
    /*
     * Enveloping App's elements inside context providers so as
     * to share the context values throughout the App
     */
    <RequestProvider>
      <TaskContextProvider>
        <div className="app">
          <NavBar />
          <TaskForm />
          <FilterTabs />
        </div>
      </TaskContextProvider>
    </RequestProvider>
  );
};

export default TaskIt;
