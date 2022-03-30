import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal, Typography } from "@mui/material";
import {
  doCreateCompany,
  doDeleteCompany,
  doGetCompany,
  doSaveCompany,
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

export const ZGCompany = () => {
  const dispatch = useDispatch();
  const master = useSelector((store) => store.master);
  const [states, setStates] = useState({
    isLoading: false,
    tokenResponse: [],
    selectedRow: [],
    editData: {
      name: "",
      code: "",
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
      editData: {},
    }));
  };

  const { isLoading, tokenResponse, selectedRow, editData, formErr } = states;

  const {
    companies = [],
    deleteCompany,
    createdCompany,
    savedCompany,
  } = master;

  const actions = {
    doCompany: () => dispatch(doGetCompany()),
    dosavecompany: (data) => dispatch(doSaveCompany(data)),
    doDeleteRow: (companyId) => dispatch(doDeleteCompany(companyId)),
    doAddCompanies: (rowData) => dispatch(doCreateCompany(rowData)),
    snackbar: (message) => dispatch(doToggleSnackbarOpen(message)),
  };
  const columns = [
    { field: "_id", headerName: "ID", editable: false, width: 200 },
    { field: "name", headerName: "Name", editable: false, width: 200 },
    { field: "code", headerName: "Code", editable: false, width: 200 },
    { field: "status", headerName: "Status", editable: false, width: 200 },
    {
      field: "designations",
      headerName: "Designation",
      editable: false,
      width: 200,
    },
  ];

  useEffect(() => {
    setStates((prevState) => ({ ...prevState, isLoading: true }));
    actions.doCompany();
  }, []);

  useEffect(() => {
    if (companies) {
      setStates((prevState) => ({
        ...prevState,
        tokenResponse: companies,
        isLoading: false,
      }));
    }
    if (deleteCompany) {
      if (deleteCompany.success) {
        actions.snackbar({
          message: deleteCompany.data,
          type: "success",
        });
        actions.doCompany();
      } else if (deleteCompany.name === "Error") {
        actions.snackbar({ message: deleteCompany.message, type: "error" });
      }
    }
    if (savedCompany) {
      if (savedCompany.status) {
        actions.snackbar({
          message: savedCompany.message,
          type: "success",
        });
        setStates((prevState) => ({
          ...prevState,
          editData: {},
        }));
        setModelEditOpen(false);
        setEditMode(false);
        actions.doCompany();
      } else if (savedCompany.name === "Error") {
        actions.snackbar({ message: savedCompany.message, type: "error" });
      }
    }
    if (createdCompany) {
      if (createdCompany.status) {
        actions.snackbar({
          message: createdCompany.message,
          type: "success",
        });
        setModelEditOpen(false);
        setStates((prevState) => ({
          ...prevState,
          editData: {},
        }));
        actions.doCompany();
      } else if (createdCompany.name === "Error") {
        actions.snackbar({
          message: createdCompany.message,
          type: "error",
        });
      }
    }
  }, [
    companies,
    savedCompany,
    createdCompany,
    deleteCompany,
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
      actions.doAddCompanies(editData);
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
      actions.dosavecompany(editData);
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
              loading={false}
              getRowId={(row) => row._id}
              componentsProps={{
                footer: {
                  deleteRowHandler,
                  addRowHandler,
                  editRowHandler,
                  selectedRow,
                  modelOpen,
                  handleOpen,
                  handleClose,
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
        onClose={handleClose}
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
        onClose={handleClose}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box sx={style.modelBox}>
          <Box sx={style.modelText}>
            <Typography
              id="modal-modal-title"
              variant="subtitle1"
              component="h2"
            >
              {editMode ? " Edit Row" : "Add new Branch"}
            </Typography>
            <Typography
              id="modal-modal-title-name"
              variant="subtitle1"
              sx={{ fontStyle: "italic" }}
              component="h2"
            >
              id
            </Typography>
          </Box>

          <ZGTextField
            id="row_name"
            label="Name"
            variant="standard"
            name="name"
            value={editData.name || ""}
            error={formErr.name}
            onChange={editChangeHandler}
          />
          <ZGTextField
            id="row_code"
            label="Code"
            value={editData.code || ""}
            error={formErr.code}
            variant="standard"
            name="code"
            onChange={editChangeHandler}
          />

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
                onClick={addConfirmHandler}
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
