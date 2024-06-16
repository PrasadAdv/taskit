import HttpPromise from "../../common/http_promise";

// calls Backend API: index
const GetAllTasks = () => {
  return HttpPromise({
    method: "GET",
    url: "/tasks",
    params: {},
  });
};

export default GetAllTasks;
