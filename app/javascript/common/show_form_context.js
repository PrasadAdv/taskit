import React, { createContext, useState, useContext } from "react";

// Create a context
const RequestContext = createContext();

// Custom hook to use the RequestContext
export const useRequestToggle = () => useContext(RequestContext);

// Context provider component
export const RequestProvider = ({ children }) => {
  const [request, setRequest] = useState({
    requestFor: "New",
    isRequested: false,
  });

  const sendRequest = (value) => {
    setRequest(value);
  };

  return (
    <RequestContext.Provider value={{ request, sendRequest }}>
      {children}
    </RequestContext.Provider>
  );
};
