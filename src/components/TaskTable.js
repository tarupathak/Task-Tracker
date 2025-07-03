import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
} from "@mui/x-data-grid";

import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const priorities = ["Low", "Medium", "High"];

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
  const [rowModesModel, setRowModesModel] = useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const handleDeleteClick = (id) => () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTask(id);
      toast.success("Task deleted successfully!");
    }
  };

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  };

  const processRowUpdate = (newRow, oldRow) => {
    const errors = {};

    if (!newRow.title?.trim()) {
      errors.title = "Title is required";
    } else if (newRow.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (newRow.description && newRow.description.length > 500) {
      errors.description = "Description must be under 500 characters";
    }

    if (!priorities.includes(newRow.priority)) {
      errors.priority = "Invalid priority";
    }

    if (!newRow.dueDate) {
      errors.dueDate = "Due date is required";
    } else if (!isValidDate(newRow.dueDate)) {
      errors.dueDate = "Due date must be a valid date (YYYY-MM-DD)";
    } else if (new Date(newRow.dueDate) < new Date(new Date().toDateString())) {
      errors.dueDate = "Due date cannot be in the past";
    }

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return oldRow;
    }

    updateTask(newRow);
    toast.success("Task updated successfully!");
    return newRow;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "title", headerName: "Title", width: 240, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    { field: "priority", headerName: "Priority", width: 130, editable: true },
    { field: "dueDate", headerName: "Due Date", width: 150, editable: true },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      editable: false,
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 150,
      editable: true,
      type: "boolean",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon fontSize="medium" />}
              label="Save"
              onClick={handleSaveClick(id)}
              key="save"
              color="success"
            />,
            <GridActionsCellItem
              icon={<CancelIcon fontSize="medium" />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              key="cancel"
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon fontSize="medium" />}
            label="Edit"
            onClick={handleEditClick(id)}
            key="edit"
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon fontSize="medium" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            key="delete"
            color="error"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 580, width: "100%", mt: 4 }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        disableSelectionOnClick
        editMode="row"
        rowHeight={60}
        headerHeight={56}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        getRowClassName={(params) =>
          params.row.completed ? "row-completed" : "row-pending"
        }
        sx={{
          fontSize: 16,
          borderRadius: 3,
          boxShadow: 4,
          "& .row-completed": {
            backgroundColor: "#e6ffed",
          },
          "& .row-pending": {
            backgroundColor: "#fff5f5",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
            fontSize: 17,
          },
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "1.6rem",
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default TaskTable;
