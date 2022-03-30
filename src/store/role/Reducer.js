import { DO_GET_ROLES } from "./ActionTypes";

const initialState = {};

const RoleReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_GET_ROLES:
      return { ...state, roles: action.data };
    default:
      return state;
  }
};

export default RoleReducer;
