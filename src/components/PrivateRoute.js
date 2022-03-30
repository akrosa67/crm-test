import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import routes from "../constants/routes";
const {login} = routes
const PrivateRoute = ({ children }) => {
  const userSignin = useSelector((state) => state.auth);
  const { userInfo } = userSignin;
  return userInfo ? children : <Navigate to={login} />;
};
export default PrivateRoute;
