import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import UpdateTask from "../apis/update_task";
import Notification from "./notification";
import { useRequestToggle } from "../../common/show_form_context";
import { TASK_STATUSES } from "../../common/constants";

const statusStyle = [
  "status-menu to-do",
  "status-menu in-progress",
  "status-menu",
];

// Task Status selector
export default function StatusSelector(props) {
  const { request, sendRequest } = useRequestToggle();
  const { data } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(
    TASK_STATUSES.indexOf(data.status)
  );
  const [message, setMessage] = useState({ status: "", message: "" });
  const [showNotification, setShowNotification] = useState(false);

  // Shows/hides notification
  const closeNotification = () => {
    setShowNotification(false);
  };

  // Sets selected status and calls update API
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    sendRequest({ ...request, isSucceeded: false });
    UpdateTask({ ...data, status: TASK_STATUSES[index] })
      .then(() => {
        setShowNotification(true);
        setMessage({
          status: "success",
          message: "Status successfully updated!",
        });
        sendRequest({ ...request, isSucceeded: true });
      })
      .catch(() => {
        setShowNotification(true);
        setMessage({
          status: "error",
          message: "Failed to update the status!",
        });
      });
    setOpen(false);
  };

  // Shows/hides selector on click of selector button
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Closes the selector when clickaway
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* Options in selector acts as buttons */}

      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button
          className={statusStyle[TASK_STATUSES.indexOf(data.status)]}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {data.status}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {TASK_STATUSES.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Notification
        open={showNotification}
        handleClose={closeNotification}
        message={message}
      />
    </React.Fragment>
  );
}
