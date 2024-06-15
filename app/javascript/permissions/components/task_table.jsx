import React, { useState } from "react";
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
import { TablePagination, Tooltip } from "@mui/material";
import StatusSelector from "./task_status_selector";
import { useRequestToggle } from "../../common/show_form_context";
import { useTaskContext } from "../../common/use_selected_task_context";

function createData(title, status, description) {
  return { title, status, description };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const { sendRequest } = useRequestToggle();
  const { sendTaskContext } = useTaskContext();

  const handleEdit = (data) => {
    sendRequest({ requestFor: "Update", isRequested: true });
    sendTaskContext(data);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.title}</TableCell>
        <TableCell className="table-row">
          <StatusSelector value={{ title: row.title, status: row.status }} />
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
                {row.description}
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
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", "In progress", "Description1"),
  createData("Ice cream sandwich", "In progress", "Description2"),
  createData("Eclair", "To do", "Description3"),
  createData("Cupcake", "To do", "Description4"),
  createData("Gingerbread", "Done", "Description5"),
];

export default function TaskTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = rows.filter((row) =>
    props.filter?.status ? row.status === props.filter?.status : true
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <>
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
              <Row key={row.title} row={row} />
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
    </>
  );
}
