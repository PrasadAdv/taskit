import HttpPromise from "../../common/http_promise";

const UpdateTask = (id, title, description, status) => {
  return HttpPromise({
    method: "PUT",
    url: "/tasks/:id",
    params: { id: id, title: title, description: description, status: status },
  });
};

export default UpdateTask;
