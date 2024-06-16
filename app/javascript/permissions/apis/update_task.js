import HttpPromise from "../../common/http_promise";

const UpdateTask = (data) => {
  return HttpPromise({
    method: "PUT",
    url: `/tasks/${data.id}`,
    params: {
      task: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    },
  });
};

export default UpdateTask;
