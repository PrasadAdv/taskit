import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

// Alert Dialogue box for confirmation of the task delete action
export default function AlertDialogue(props) {
  const { open, handleAlertDialogue, handleCancel, handleDelete } = props;

  // when option 'No' is selected
  const handleNo = () => {
    handleAlertDialogue(false);
  };

  // when option 'Yes' is selected
  const handleYes = () => {
    handleDelete(); // propagates confirmation back to caller
    handleAlertDialogue(false); // unsets Alert dialogue box
    handleCancel(); // propagates form closure after delete action back to caller
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
