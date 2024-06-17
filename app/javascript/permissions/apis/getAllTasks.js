import HttpPromise from "../../common/httpPromise";

// calls Backend API: index
const GetAllTasks = () => {
  return HttpPromise({
    method: "GET",
    url: "/tasks",
    params: {},
  });
};

export default GetAllTasks;
