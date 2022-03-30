import { DO_GET_MENU } from "./ActionTypes";

const initialState = {};

const MenuReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DO_GET_MENU:
      return { ...state, menus: action.data };
    default:
      return state;
  }
};

export default MenuReducer;
