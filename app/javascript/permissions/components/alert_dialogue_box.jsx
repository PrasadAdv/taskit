import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialogue(props) {
  const { open, handleAlertDialogue, handleCancel, handleDelete } = props;

  const handleNo = () => {
    handleAlertDialogue(false);
  };

  const handleYes = () => {
    handleDelete();
    handleAlertDialogue(false);
    handleCancel();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
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
    </React.Fragment>
  );
}
