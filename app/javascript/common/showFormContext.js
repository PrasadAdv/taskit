import React, { createContext, useState, useContext } from "react";

// RequestContext entails whether request is for "New" or "Update"
const RequestContext = createContext();

// Custom hook to use the RequestContext
export const useRequestToggle = () => useContext(RequestContext);

// Context provider component
export const RequestProvider = ({ children }) => {
  /* For example,
    {
      requestFor: "New",        // New task request
      isRequested: false,       // Is request initiated?
      isSucceeded: false,       // Is request succeeded?
    }
  */

  const [request, setRequest] = useState({
    requestFor: "New",
    isRequested: false,
    isSucceeded: false,
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
