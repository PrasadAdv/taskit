import HttpPromise from "../../common/httpPromise";

// calls Backend API: delete
const DeleteTask = (id) => {
  return HttpPromise({
    method: "DELETE",
    url: `/tasks/${id}`,
    params: {},
  });
};

export default DeleteTask;
