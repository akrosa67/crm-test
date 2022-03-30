import {
  SUCCESS,
  DO_GET_BRANCH,
  GET_ALL_DEPARTMENT,
  ERROR,
  DO_GET_COMPANY,
  DO_SAVE_BRANCH,
  DO_GET_DESIGNATION,
  DO_SAVE_COMPANY,
  DO_GET_COUNTRIES,
  DO_GET_STATES,
  DO_GET_CITIES,
  TOGGLE_SNACKBAR_OPEN,
  TOGGLE_SNACKBAR_CLOSE,
  DO_DELETE_BRANCH,
  DO_CREATE_BRANCH,
  DO_CREATE_COMPANY,
  DO_DELETE_DEPARTMENT,
  DO_SAVE_DESIGNATION,
  DO_DELETE_DESIGNATION,
  DO_CREATE_DESIGNATION,
  DO_CREATE_DEPARTMENT,
  DO_SAVE_DEPARTMENT,
  DO_DELETE_COMPANY,
} from "./ActionTypes";

const initialState = {
//   companies: [],
//   branches: [],
//   designations: [],
//   countries: [],
//   states: [],
//   cities: [],
//   success: "",
//   error: "",
//   toggleSnackbar: false,
  snackbarMessage: {},
//   createdBranch: {},
//   deleteBranch: {},
//   saveBranch: {},
//   deleteDesignation: {},
//   createdDesignation: {},
//   savedDesignation: {},
//   deleteDepartment: {},
//   createdDepartment: {},
//   savedDepartment: {},
//   deleteCompany: {},
//   createdCompany: {},
//   savedCompany: {},
};

const MasterReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUCCESS:
      return { ...state, success: action.data };
    case ERROR:
      return { ...state, error: action.data };
    case DO_GET_COMPANY:
      return { ...state, companies: action.data };
    case DO_GET_DESIGNATION:
      return { ...state, designations: action.data };
    case DO_SAVE_DESIGNATION:
      return { ...state, savedDesignation: action.data };
    case DO_DELETE_DESIGNATION:
      return { ...state, deleteDesignation: action.data };
    case DO_CREATE_DESIGNATION:
      return { ...state, createdDesignation: action.data };
    case DO_SAVE_COMPANY:
      return { ...state, savedCompany: action.data };
    case DO_GET_BRANCH:
      return { ...state, branches: action.data };
    case GET_ALL_DEPARTMENT:
      return { ...state, departments: action.data };
    case DO_DELETE_DEPARTMENT:
      return { ...state, deleteDepartment: action.data };
    case DO_CREATE_DEPARTMENT:
      return { ...state, createdDepartment: action.data };
    case DO_SAVE_DEPARTMENT:
      return { ...state, savedDepartment: action.data };
    case DO_SAVE_BRANCH:
      return { ...state, saveBranch: action.data };
    case DO_DELETE_BRANCH:
      return { ...state, deleteBranch: action.data };
    case DO_GET_COUNTRIES:
      return { ...state, countries: action.data };
    case DO_GET_STATES:
      return { ...state, states: action.data };
    case DO_GET_CITIES:
      return { ...state, cities: action.data };
    case DO_CREATE_BRANCH:
      return { ...state, createdBranch: action.data };
    case DO_CREATE_COMPANY:
      return { ...state, createdCompany: action.data };
    case DO_DELETE_COMPANY:
      return { ...state, deleteCompany: action.data };
    case TOGGLE_SNACKBAR_OPEN:
      return {
        ...state,
        toggleSnackbar: true,
        snackbarMessage: action.message,
      };
    case TOGGLE_SNACKBAR_CLOSE:
      return {
        ...state,
        toggleSnackbar: false,
        deleteBranch: {},
        saveBranch: {},
        createdBranch: {},
        deleteDesignation: {},
        createdDesignation: {},
        savedDesignation: {},
        deleteDepartment: {},
        createdDepartment: {},
        savedDepartment: {},
        deleteCompany: {},
        createdCompany: {},
        savedCompany: {},
      };
    default:
      return state;
  }
};

export default MasterReducer;
