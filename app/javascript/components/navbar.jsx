import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton, Tooltip } from "@mui/material";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { useRequestToggle } from "../common/show_form_context";

const NavBar = () => {
  const { sendRequest } = useRequestToggle();
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskIt
        </Typography>
        <Tooltip title="Add task" arrow>
          <IconButton
            color="inherit"
            onClick={() =>
              sendRequest({ requestFor: "New", isRequested: true })
            }
          >
            <AddTaskOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
