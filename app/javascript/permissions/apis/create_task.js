import HttpPromise from "../../common/http_promise";

const CreateTask = (title, description, status) => {
  return HttpPromise({
    method: "POST",
    url: "/tasks",
    params: { title: title, description: description, status: status },
  });
};

export default CreateTask;
