import HttpPromise from "../../common/http_promise";

const GetTask = (id) => {
  return HttpPromise({
    method: "GET",
    url: "/tasks/:id",
    params: { id: id },
  });
};

export default GetTask;
