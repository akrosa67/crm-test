import environmentSwitcer from "./environmentSwitcher";

const URLS = {
  dev: {
    DO_LOGIN: "login",
    DO_LOGOUT: "logout",
    DO_GET_BRANCH: "get_all_branch",
    DO_SAVE_BRANCH: "update_branch_by_id",
    ADD_COMPANY: "add_company",
    GET_ALL_COMPANY: "get_all_company",
    UPDATE_COMPANY_BY_ID: "update_company_by_id",
    ADD_BRANCH: "add_branch",
    GET_ALL_BRANCH: "get_all_branch",
    DO_DELETE_BRANCH: "delete_branch_by_id",
    ADD_DEPARTMENT: "add_department",
    GET_ALL_DEPARTMENT: "get_all_department",
    UPDATE_DEPARTMENT_BY_ID: "update_department_by_id",
    ADD_DESIGNATION: "add_designation",
    GET_ALL_DESIGNATION: "get_all_designation",
    UPDATE_DESIGNATION_BY_ID: "update_designation_by_id",
    GET_ALL_COUNTRY: "get_all_country",
    GET_ALL_STATE: "get_all_state",
    GET_ALL_CITY: "get_all_city",
    DO_GET_MENU: "get_all_menu",
    DO_GET_ROLES: "get_all_role",
  },
  prod: {
    DO_LOGIN: "login",
    DO_LOGOUT: "logout",
    DO_GET_BRANCH: "get_all_branch",
    DO_SAVE_BRANCH: "update_branch_by_id",
    ADD_COMPANY: "add_company",
    GET_ALL_COMPANY: "get_all_company",
    UPDATE_COMPANY_BY_ID: "update_company_by_id",
    ADD_BRANCH: "add_branch",
    GET_ALL_BRANCH: "get_all_branch",
    DO_DELETE_BRANCH: "delete_branch_by_id",
    ADD_DEPARTMENT: "add_department",
    GET_ALL_DEPARTMENT: "get_all_department",
    UPDATE_DEPARTMENT_BY_ID: "update_department_by_id",
    ADD_DESIGNATION: "add_designation",
    GET_ALL_DESIGNATION: "get_all_designation",
    UPDATE_DESIGNATION_BY_ID: "update_designation_by_id",
    GET_ALL_COUNTRY: "get_all_country",
    GET_ALL_STATE: "get_all_state",
    GET_ALL_CITY: "get_all_city",
    DO_GET_MENU: "get_all_menu",
    DO_GET_ROLES: "get_all_role",
  },
};

const getURL = (key) => {
  let url = URLS[environmentSwitcer.getEnvironment()][key];
  return url;
};

export { getURL };
