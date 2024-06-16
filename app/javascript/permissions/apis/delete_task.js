import HttpPromise from "../../common/http_promise";

const DeleteTask = (id) => {
  return HttpPromise({
    method: "DELETE",
    url: `/tasks/${id}`,
    params: {},
  });
};

export default DeleteTask;
