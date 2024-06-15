import NavBar from "./navbar";
import React from "react";
import FilterTabs from "./taskdisplay";
import TaskForm from "../permissions/components/task_form";
import { RequestProvider } from "../common/show_form_context";
import { TaskContextProvider } from "../common/use_selected_task_context";

const HelloWorld = () => {
  return (
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

export default HelloWorld;
