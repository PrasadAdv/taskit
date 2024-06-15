import React, { useState, useEffect } from "react";
import { Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRequestToggle } from "../../common/show_form_context";
import { useTaskContext } from "../../common/use_selected_task_context";
import AlertDialog from "./alert_dialogue_box";

const options = ["To do", "In progress", "Done"];
const defaultData = { title: "", status: "To do", description: "" };

const TaskForm = () => {
  const { request, sendRequest } = useRequestToggle();
  const { taskContext } = useTaskContext();
  const [formData, setFormData] = useState(defaultData);
  const [isDelete, setIsDelete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const clearForm = () => {
    setFormData(defaultData);
  };

  const handleCancel = () => {
    clearForm();
    sendRequest({ requestFor: "New", isRequested: false });
  };

  const handleDelete = (value) => {
    setIsDelete(value);
  };

  useEffect(() => {
    request.requestFor === "Update"
      ? setFormData(taskContext)
      : setFormData(defaultData);
  }, [taskContext, request.requestFor]);

  return (
    <>
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
                    onClick={() => handleDelete(true)}
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
                  {options.map((option) => (
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
                value={formData.description}
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
      <AlertDialog
        value={isDelete}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default TaskForm;
