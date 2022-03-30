import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Modal, Typography } from "@mui/material";
import {
  doCreateBranch,
  doDeleteBranch,
  doGetBranch,
  doGetCities,
  doGetCountries,
  doGetStates,
  doSaveBranch,
  doToggleSnackbarOpen,
} from "../../store/master/ActionCreators";
import { ZGTable } from "../../components";
import { ZGButton } from "../ZGButton";
import { ZGTextField } from "../ZGTextField";
import { ZGSelectField } from "../ZGSelectField";

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

export const ZGBranch = () => {
  const dispatch = useDispatch();
  const master = useSelector((store) => store.master);
  const [states, setStates] = useState({
    isLoading: false,
    tokenResponse: [],
    selectedRow: [],
    editData: {
      name: "",
      state: "",
      city: "",
      country: "",
      code: "",
      email: "",
      pincode: "",
      mobileNumber: "",
      address: "",
      companyId: "61a3b33d02676e84da89ce6f",
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
      editData: { companyId: "61a3b33d02676e84da89ce6f" },
    }));
  };

  const {
    isLoading,
    tokenResponse,
    selectedRow,
    editData,
    getStates,
    getCities,
    getCountries,
    formErr,
  } = states;
  const { branches = [], deleteBranch, saveBranch, createdBranch } = master;

  const actions = {
    doBranch: () => dispatch(doGetBranch()),
    getCity: () => dispatch(doGetCities()),
    getState: () => dispatch(doGetStates()),
    getCountry: () => dispatch(doGetCountries()),
    dosaveBranch: (data) => dispatch(doSaveBranch(data)),
    doDeleteRow: (branchId) => dispatch(doDeleteBranch(branchId)),
    doCreateBranch: (rowData) => dispatch(doCreateBranch(rowData)),
    snackbar: (message) => dispatch(doToggleSnackbarOpen(message)),
  };
  const columns = [
    { field: "_id", headerName: "Id", editable: false, width: 200 },
    { field: "name", headerName: "Name", editable: false, width: 200 },
    { field: "code", headerName: "Code", editable: false, width: 100 },
    { field: "address", headerName: "Address", editable: false, width: 150 },
    { field: "city", headerName: "City", editable: false, width: 100 },
    { field: "state", headerName: "State", editable: false, width: 100 },
    { field: "country", headerName: "Country", editable: false, width: 100 },
    { field: "pincode", headerName: "Pincode", editable: false, width: 100 },
    {
      field: "mobileNumber",
      headerName: "Mobile",
      editable: false,
      width: 100,
    },
    { field: "email", headerName: "Email", editable: false, width: 150 },
    {
      field: "companyId",
      headerName: "Company Id",
      editable: false,
      width: 220,
    },
  ];

  useEffect(() => {
    setStates((prevState) => ({ ...prevState, isLoading: true }));
    actions.doBranch();
  }, []);

  useEffect(() => {
    if (branches) {
      if (branches.name === "Error") {
        actions.snackbar(branches.name);
        setStates((prevState) => ({
          ...prevState,
          branchError: true,
        }));
      }
      setStates((prevState) => ({
        ...prevState,
        tokenResponse: branches,
        isLoading: false,
      }));
    }
    if (deleteBranch) {
      if (deleteBranch.status) {
        actions.snackbar({ message: deleteBranch.message, type: "success" });
        actions.doBranch();
      } else if (deleteBranch.name === "Error") {
        actions.snackbar({ message: deleteBranch.message, type: "error" });
      }
    }
    if (saveBranch) {
      if (saveBranch.status) {
        actions.snackbar({ message: saveBranch.message, type: "success" });
        setStates((prevState) => ({
          ...prevState,
          editData: { companyId: "61a3b33d02676e84da89ce6f" },
        }));
        setModelEditOpen(false);
        setEditMode(false);
        actions.doBranch();
      } else if (saveBranch.name === "Error") {
        actions.snackbar({ message: saveBranch.message, type: "error" });
      }
    }
    if (createdBranch) {
      if (createdBranch.status) {
        actions.snackbar({ message: createdBranch.message, type: "success" });
        setModelEditOpen(false);
        setStates((prevState) => ({
          ...prevState,
          editData: {},
        }));
        actions.doBranch();
      } else if (createdBranch.name === "Error") {
        actions.snackbar({ message: createdBranch.message, type: "error" });
      }
    }

    if (master.countries) {
      setStates((prevState) => ({
        ...prevState,
        getCountries: master.countries,
      }));
    }
    getPlaces();
  }, [
    branches,
    editData,
    saveBranch,
    createdBranch,
    deleteBranch,
    master.countries,
  ]);
  const editChangeHandler = (e) => {
    setStates((prevState) => ({
      ...prevState,
      editData: { ...editData, [e.target.name]: e.target.value },
    }));
  };
  const fieldValidation = (formValue) => {
    let {
      name,
      state,
      city,
      country,
      code,
      email,
      pincode,
      mobileNumber,
      address,
      companyId,
    } = formValue;
    let error = {};
    let emailRegex = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );
    name ? (error.name = false) : (error.name = true);
    state ? (error.state = false) : (error.state = true);
    city ? (error.city = false) : (error.city = true);
    country ? (error.country = false) : (error.country = true);
    pincode ? (error.pincode = false) : (error.pincode = true);
    mobileNumber ? (error.mobileNumber = false) : (error.mobileNumber = true);
    code ? (error.code = false) : (error.code = true);
    address ? (error.address = false) : (error.address = true);
    companyId ? (error.companyId = false) : (error.companyId = true);
    emailRegex ? (error.email = true) : (error.email = false);
    return error;
  };

  const addRowHandler = () => {
    actions.getCity();
    actions.getState();
    actions.getCountry();
    setModelEditOpen(true);
  };
  const addConfirmHandler = (e) => {
    e.preventDefault();
    var errValue = fieldValidation(editData);
    setStates((prevState) => ({ ...prevState, formErr: errValue }));
    if (!Object.values(errValue).includes(true)) {
      actions.doCreateBranch(editData);
    }
  };

  const onRowClick = (e) => {
    const { row } = e;
    setStates((prevState) => ({ ...prevState, selectedRow: row }));
  };
  const editRowHandler = () => {
    actions.getCity();
    actions.getState();
    actions.getCountry();
    setModelEditOpen(true);
    setEditMode(true);
    setStates((prevState) => ({ ...prevState, editData: selectedRow }));
  };
  const editConfirmHandler = () => {
    var errValue = fieldValidation(editData);
    setStates((prevState) => ({ ...prevState, formErr: errValue }));

    if (!Object.values(errValue).includes(true)) {
      actions.dosaveBranch(editData);

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

  const getPlaces = () => {
    let selectCountry = editData.country;
    let selectState = editData.state;
    let country = master.countries;
    let getState = master.states;
    let city = master.cities;
    if (selectCountry && country) {
      let c = country.find((w) => w.name === selectCountry);
      if (c) {
        setStates((prevState) => ({ ...prevState, getStates: c.states }));
      }
    }

    if (selectState && getState) {
      let s = getState.find((w) => w.name === selectState);
      if (s && city) {
        let c = city.filter((w) => w.state === s._id);
        if (c) {
          setStates((prevState) => ({ ...prevState, getCities: c }));
        }
      }
    }
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
            <Grid item lg={4} xl={4} md={6}>
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
              <ZGTextField
                id="row_email"
                label="Email"
                value={editData.email || ""}
                error={formErr.email}
                variant="standard"
                name="email"
                onChange={editChangeHandler}
              />
            </Grid>

            <Grid item lg={4} xl={4} md={6}>
              <ZGSelectField
                label="City"
                variant="standard"
                name="city"
                value={editData.city || ""}
                error={formErr.city}
                values={getCities}
                onChange={editChangeHandler}
              />
              <ZGSelectField
                label="State"
                variant="standard"
                error={formErr.state}
                value={editData.state || ""}
                name="state"
                values={getStates}
                onChange={editChangeHandler}
              />
              <ZGSelectField
                label="Country"
                variant="standard"
                name="country"
                value={editData.country || ""}
                error={formErr.country}
                values={getCountries}
                onChange={editChangeHandler}
              />
            </Grid>
            <Grid item lg={4} xl={4} md={6}>
              <ZGTextField
                id="row_pincode"
                label="Pin Code"
                name="pincode"
                value={editData.pincode || ""}
                error={formErr.pincode}
                variant="standard"
                onChange={editChangeHandler}
              />

              <ZGTextField
                id="row_mobileNumber"
                label="Mobile"
                value={editData.mobileNumber || ""}
                error={formErr.mobileNumber}
                variant="standard"
                name="mobileNumber"
                onChange={editChangeHandler}
              />
              <ZGTextField
                id="row_address"
                label="Address"
                variant="standard"
                value={editData.address || ""}
                error={formErr.address}
                name="address"
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
