import { combineReducers } from "redux";
import AuthReducer from "./auth/Reducer";
import MasterReducer from "./master/Reducer";
import MenuReducer from "./menus/Reducer";
import RoleReducer from "./role/Reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  master: MasterReducer,
  menu: MenuReducer,
  role: RoleReducer,
});

export default rootReducer;
