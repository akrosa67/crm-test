import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Modal, Typography } from "@mui/material";
import {
  doCreateDesignation,
  doDeleteDesignation,
  doGetDesignation,
  doSaveDesignation,
  doToggleSnackbarOpen,
} from "../../store/master/ActionCreators";
import { ZGTable } from "../../components";
import { ZGButton } from "../ZGButton";
import { ZGTextField } from "../ZGTextField";

const style = {
  modelBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    margin: "auto",
    boxShadow: 24,
    p: 4,
  },
  modelText: { display: "flex", gap: "5px" },
  modelAction: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  modelGrid: {
    margin: "auto",
  },
};

export const ZGDesignation = () => {
  const dispatch = useDispatch();
  const master = useSelector((store) => store.master);
  const [states, setStates] = useState({
    isLoading: false,
    tokenResponse: [],
    selectedRow: [],
    editData: {
      name: "",
      code: "",
      departmentId: "61a3b33d02676e84da89ce6f",
    },
    formErr: {},
    getStates: [],
    getCities: [],
    getCountries: [],
  });
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modelEditOpen, setModelEditOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const handleOpen = () => setModelOpen(true);
  const handleClose = () => {
    setModelOpen(false);
    setModelEditOpen(false);
    setEditMode(false);
    setStates((prevState) => ({
      ...prevState,
      formErr: {},
      selectedRow: {},
      editData: { departmentId: "61a3b33d02676e84da89ce6f" },
    }));
  };

  const {
    isLoading,
    tokenResponse,
    selectedRow,
    editData,

    formErr,
  } = states;

  const {
    designations = [],
    deleteDesignation,
    createdDesignation,

    savedDesignation,
  } = master;

  const actions = {
    doDesignation: () => dispatch(doGetDesignation()),
    doSaveDesignations: (data) => dispatch(doSaveDesignation(data)),
    doDeleteRow: (companyId) => dispatch(doDeleteDesignation(companyId)),
    doAddDesignation: (rowData) => dispatch(doCreateDesignation(rowData)),
    snackbar: (message) => dispatch(doToggleSnackbarOpen(message)),
  };
  const columns = [
    { field: "_id", headerName: "ID", editable: false, width: 100 },
    { field: "name", headerName: "Name", editable: false, width: 200 },
    { field: "code", headerName: "Code", editable: false, width: 200 },
    { field: "status", headerName: "Status", editable: false, width: 200 },
    {
      field: "departmentId",
      headerName: "Department Id",
      editable: false,
      width: 200,
    },
  ];

  useEffect(() => {
    setStates((prevState) => ({ ...prevState, isLoading: true }));
    actions.doDesignation();
  }, []);

  useEffect(() => {
    if (designations) {
      setStates((prevState) => ({
        ...prevState,
        tokenResponse: designations,
        isLoading: false,
      }));
    }
    if (deleteDesignation) {
      if (deleteDesignation.success) {
        actions.snackbar({ message: deleteDesignation.data, type: "success" });
        actions.doDesignation();
      } else if (deleteDesignation.name === "Error") {
        actions.snackbar({ message: deleteDesignation.message, type: "error" });
      }
    }
    if (savedDesignation) {
      if (savedDesignation.status) {
        actions.snackbar({
          message: savedDesignation.message,
          type: "success",
        });
        setStates((prevState) => ({
          ...prevState,
          editData: { departmentId: "61a3b33d02676e84da89ce6f" },
        }));
        setModelEditOpen(false);
        setEditMode(false);
        actions.doDesignation();
      } else if (savedDesignation.name === "Error") {
        actions.snackbar({ message: savedDesignation.message, type: "error" });
      }
    }
    if (createdDesignation) {
      if (createdDesignation.status) {
        actions.snackbar({
          message: createdDesignation.message,
          type: "success",
        });
        setModelEditOpen(false);
        setStates((prevState) => ({
          ...prevState,
          editData: { departmentId: "61a3b33d02676e84da89ce6f" },
        }));
        actions.doDesignation();
      } else if (createdDesignation.name === "Error") {
        actions.snackbar({
          message: createdDesignation.message,
          type: "error",
        });
      }
    }
  }, [
    designations,
    editData,
    savedDesignation,
    createdDesignation,
    deleteDesignation,
    master.countries,
  ]);

  const editChangeHandler = (e) => {
    setStates((prevState) => ({
      ...prevState,
      editData: { ...editData, [e.target.name]: e.target.value },
    }));
  };
  const fieldValidation = (formValue) => {
    let { name, code } = formValue;
    let error = {};
    name ? (error.name = false) : (error.name = true);
    code ? (error.code = false) : (error.code = true);
    return error;
  };

  const addConfirmHandler = (e) => {
    e.preventDefault();
    var errValue = fieldValidation(editData);
    setStates((prevState) => ({ ...prevState, formErr: errValue }));
    if (!Object.values(errValue).includes(true)) {
      actions.doAddDesignation(editData);
    }
  };

  const addRowHandler = () => {
    setModelEditOpen(true);
  };
  const onRowClick = (e) => {
    const { row } = e;
    setStates((prevState) => ({ ...prevState, selectedRow: row }));
  };
  const editRowHandler = () => {
    setModelEditOpen(true);
    setEditMode(true);
    setStates((prevState) => ({ ...prevState, editData: selectedRow }));
  };
  const editConfirmHandler = () => {
    var errValue = fieldValidation(editData);
    setStates((prevState) => ({ ...prevState, formErr: errValue }));

    if (!Object.values(errValue).includes(true)) {
      actions.doSaveDesignations(editData);
    }
  };
  const deleteRowHandler = () => {
    setModelOpen(true);
  };
  const deleteConfirmHandler = () => {
    actions.doDeleteRow(selectedRow._id);
    setModelOpen(false);
    setStates((prevState) => ({ ...prevState, selectedRow: [] }));
  };

  return (
    <div>
      {isLoading ? (
        <Typography variant="body" gutterBottom>
          Loading...
        </Typography>
      ) : (
        tokenResponse && (
          <div style={{ width: "100%" }}>
            <ZGTable
              loading={isLoading}
              getRowId={(row) => row._id}
              componentsProps={{
                footer: {
                  deleteRowHandler,
                  addRowHandler,
                  selectedRow,
                  modelOpen,
                  handleOpen,
                  handleClose,
                  editRowHandler,
                },
              }}
              rows={tokenResponse}
              columns={columns}
              onRowClick={onRowClick}
            />
          </div>
        )
      )}

      <Modal
        open={modelOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modelBox}>
          <Box sx={style.modelText}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h2"
            >
              Do you want to delete the row
            </Typography>
            <Typography
              id="modal-modal-title-name"
              variant="subtitle1"
              sx={{ fontStyle: "italic" }}
              component="h2"
            >
              {selectedRow.name}
            </Typography>
          </Box>
          <Box sx={style.modelAction}>
            <ZGButton
              onClick={deleteConfirmHandler}
              variant="outlined"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Delete
            </ZGButton>
            <ZGButton
              onClick={handleClose}
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Cancel
            </ZGButton>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={modelEditOpen}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={style.modelBox} component="form" onSubmit={addConfirmHandler}>
          <Grid sx={style.modelGrid} spacing={1} container>
            <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
              <Box sx={style.modelText}>
                <Typography
                  id="modal-modal-title"
                  variant="subtitle1"
                  component="h2"
                >
                  {editMode ? " Edit Row" : "Add new Branch"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} xl={6} md={6}>
              <ZGTextField
                id="row_name"
                label="Name"
                variant="standard"
                name="name"
                value={editData.name || ""}
                error={formErr.name}
                onChange={editChangeHandler}
              />
            </Grid>

            <Grid item lg={6} xl={6} md={6}>
              <ZGTextField
                id="row_code"
                label="Code"
                value={editData.code || ""}
                error={formErr.code}
                variant="standard"
                name="code"
                onChange={editChangeHandler}
              />
            </Grid>
          </Grid>
          <Box sx={style.modelAction}>
            {editMode ? (
              <ZGButton
                onClick={editConfirmHandler}
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
              >
                Edit row
              </ZGButton>
            ) : (
              <ZGButton
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
              >
                Add row
              </ZGButton>
            )}

            <ZGButton
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Cancel
            </ZGButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
