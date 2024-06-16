import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  CircularProgress,
  Container,
  TablePagination,
  Tooltip,
} from "@mui/material";
import StatusSelector from "./task_status_selector";
import { useRequestToggle } from "../../common/show_form_context";
import { useTaskContext } from "../../common/use_selected_task_context";
import GetAllTasks from "../apis/get_all_tasks";
import { isEmpty } from "lodash";

// Returns a row in the table
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const { sendRequest } = useRequestToggle();
  const { sendTaskContext } = useTaskContext();

  // Sends request to show form for Update action and
  // sends selected task context for form pre-population
  const handleEdit = (data) => {
    sendRequest({ requestFor: "Update", isRequested: true });
    sendTaskContext(data);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.title}</TableCell>
        <TableCell className="table-row">
          <StatusSelector data={row} />
        </TableCell>
        <TableCell className="table-row">
          <Tooltip title="Description" arrow>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleEdit(row)}
            >
              <EditNoteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="description">Description:</Typography>
              <Paper className="description-content" elevation={0}>
                <div style={{ whiteSpace: "pre-wrap" }}> {row.description}</div>
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

// Displays 'loader'/ 'Error page'/ 'No tasks found page' based on API call response
function Banner(props) {
  switch (props.apiCallStatus) {
    case "loading":
      return (
        <Container className="banner">
          <CircularProgress />
        </Container>
      );
    case "error":
      return (
        <Container className="banner-error">
          <h2>Error occured while fetching data</h2>
        </Container>
      );
    default:
      return (
        <Container className="banner">
          <h2>No tasks Found</h2>
        </Container>
      );
  }
}

// Table to display Tasks
export default function TaskTable(props) {
  const { taskStatus } = props;
  const { request } = useRequestToggle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [apiCallStatus, setApiCallStatus] = useState("loading");

  // handles page change in table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handles per page change in table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // filters data as per task status
  const filteredData = data.filter((row) =>
    taskStatus ? row.status === taskStatus : true
  );

  // sorts data as per recent creation
  const sortedData = [...filteredData].sort((a, b) => b.id - a.id);

  // paginates the data
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  // Handles API call for Index request
  // Fetches all data when initially loaded or any data change happens
  // like New, Update or Delete
  useEffect(() => {
    if (request.isSucceeded || initialLoad) {
      setInitialLoad(false);
      setApiCallStatus("loading");
      GetAllTasks()
        .then((response) => {
          setData(response.data);
          setApiCallStatus("done");
        })
        .catch((e) => {
          setApiCallStatus("error");
        });
    }
  }, [request.isSucceeded, initialLoad]);

  return isEmpty(filteredData) ? (
    <Banner apiCallStatus={apiCallStatus} />
  ) : (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="table-row table-row-color">Title</TableCell>
              <TableCell className="table-row table-row-color">
                Status
              </TableCell>
              <TableCell className="table-row table-row-color">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="pagination"
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
