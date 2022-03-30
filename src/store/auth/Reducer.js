import { DO_AUTHENTICATE, DO_LOGIN, DO_LOGOUT } from "./ActionTypes";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const AuthReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_AUTHENTICATE:
      return { ...state, token: action.data };
    case DO_LOGIN:
      return { ...state, userInfo: action.data };
    case DO_LOGOUT:
      return { ...state, loggedout: action.data, userInfo:null };
    default:
      return state;
  }
};

export default AuthReducer;
