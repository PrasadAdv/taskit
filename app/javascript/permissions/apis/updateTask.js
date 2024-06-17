import HttpPromise from "../../common/httpPromise";

// calls Backend API: update
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
