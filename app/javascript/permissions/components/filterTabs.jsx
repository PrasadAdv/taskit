import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TaskTable from "./task_table";

export default function FilterTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All tasks" value="1" />
            <Tab label="Tasks to do" value="2" />
            <Tab label="Tasks in progress" value="3" />
            <Tab label="Tasks completed" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TaskTable />
        </TabPanel>
        <TabPanel value="2">
          <TaskTable taskStatus="To do" />
        </TabPanel>
        <TabPanel value="3">
          <TaskTable taskStatus="In progress" />
        </TabPanel>
        <TabPanel value="4">
          <TaskTable taskStatus="Done" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
