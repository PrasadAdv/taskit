import axios from "axios";

// Handles Frontend interactions with Backend APIs
const HttpPromise = (requestDetails) => {
  axios.interceptors.response.use(function (response) {
    if (
      typeof response.data !== "undefined" &&
      typeof response.data.status !== "undefined" &&
      response.data.status === 401
    ) {
      window.location = "/";
    } else {
      return response;
    }
  });

  const token = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

  return axios(requestDetails);
};

export default HttpPromise;
