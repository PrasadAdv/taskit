import React, { useState, useEffect } from "react";
import { Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRequestToggle } from "../../common/show_form_context";
import { useTaskContext } from "../../common/use_selected_task_context";
import Notification from "./notification";
import CreateTask from "../apis/create_task";
import UpdateTask from "../apis/update_task";
import DeleteTask from "../apis/delete_task";
import AlertDialogue from "./alert_dialogue_box";
import { TASK_STATUSES } from "../../common/constants";

const defaultData = { id: "", title: "", status: "To do", description: "" };

const TaskForm = () => {
  const { request, sendRequest } = useRequestToggle();
  const { taskContext } = useTaskContext();
  const [formData, setFormData] = useState(defaultData);
  const [showAlertDialogue, setShowAlertDialogue] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [message, setMessage] = useState({ status: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const clearForm = () => {
    setFormData(defaultData);
  };

  const handleCancel = () => {
    clearForm();
    sendRequest({ requestFor: "New", isRequested: false, isSucceeded: false });
  };

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleAlertDialogue = (value) => {
    setShowAlertDialogue(value);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    request.requestFor === "Update"
      ? setFormData(taskContext)
      : setFormData(defaultData);
  }, [taskContext, request.requestFor]);

  useEffect(() => {
    if (isFormSubmitted) {
      sendRequest({ ...request, isSucceeded: false });
      if (request.requestFor === "New") {
        CreateTask(formData)
          .then(() => {
            setShowNotification(true);
            setMessage({
              status: "success",
              message: "Task successfully saved!",
            });
            sendRequest({ ...request, isSucceeded: true });
          })
          .catch(() => {
            setShowNotification(true);
            setMessage({
              status: "error",
              message: "Failed to create the task!",
            });
          });
      } else {
        UpdateTask(formData)
          .then(() => {
            setShowNotification(true);
            setMessage({
              status: "success",
              message: "Task successfully saved!",
            });
            sendRequest({ ...request, isSucceeded: true });
          })
          .catch(() => {
            setShowNotification(true);
            setMessage({
              status: "error",
              message: "Failed to update the task!",
            });
          });
      }
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  useEffect(() => {
    if (confirmDelete) {
      DeleteTask(taskContext.id)
        .then(() => {
          setShowNotification(true);
          setMessage({
            status: "success",
            message: "Task successfully deleted!",
          });
          sendRequest({ ...request, isSucceeded: true });
        })
        .catch((e) => {
          setShowNotification(true);
          setMessage({
            status: "error",
            message: "Failed to delete the task!",
          });
        });
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <React.Fragment>
      {request.isRequested && (
        <Container className="form">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack direction="row" spacing={2}>
                <Typography variant="h6">{request.requestFor} Task </Typography>
                <Button type="submit" variant="contained">
                  Save
                </Button>
                <Button type="reset" variant="contained" onClick={clearForm}>
                  Clear
                </Button>
                {request.requestFor === "Update" && (
                  <Button
                    color="error"
                    type="button"
                    variant="contained"
                    onClick={() => handleAlertDialogue(true)}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  required
                  className="title-field"
                  id="outlined-required"
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  select
                  required
                  className="status-field"
                  id="outlined-required"
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {TASK_STATUSES.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                className="title-field"
                id="outlined-multiline-static"
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                multiline
                rows={4}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>
          </form>
        </Container>
      )}
      <AlertDialogue
        open={showAlertDialogue}
        handleAlertDialogue={handleAlertDialogue}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
      <Notification
        open={showNotification}
        handleClose={closeNotification}
        message={message}
      />
    </React.Fragment>
  );
};

export default TaskForm;
