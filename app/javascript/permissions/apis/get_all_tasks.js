import HttpPromise from "../../common/http_promise";

const GetAllTasks = () => {
  return HttpPromise({
    method: "GET",
    url: "/tasks",
    params: {},
  });
};

export default GetAllTasks;
