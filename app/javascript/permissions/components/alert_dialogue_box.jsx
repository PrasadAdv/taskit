import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Notification from "./notification";

export default function AlertDialog(props) {
  const { value, handleDelete, handleCancel } = props;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleNo = () => {
    handleDelete(false);
  };

  const handleYes = () => {
    setIsDeleted(true);
    handleDelete(false);
    handleCancel();
    console.log("deletes the data");
  };

  const handleClose = () => {
    setIsDeleted(false);
  };

  return (
    <>
      <Dialog
        open={value}
        onClose={handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Notification open={isDeleted} handleClose={handleClose} />
    </>
  );
}
