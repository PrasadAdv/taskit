import HttpPromise from "../../common/http_promise";

const CreateTask = (data) => {
  return HttpPromise({
    method: "POST",
    url: "/tasks",
    params: {
      task: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    },
  });
};

export default CreateTask;
