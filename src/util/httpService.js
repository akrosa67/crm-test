import axios from "axios";
import { useSelector } from "react-redux";
import appConfig from "./appConfig";
import { getURL } from "./urlDetails";

const httpInstance = axios.create({
  baseURL: appConfig.baseURL ? appConfig.baseURL : "",
  timeout: 15000,
  headers: {},
});

export const doGet = (actionName, header) => {
  let url = getURL(actionName);
  return httpInstance.get(url, header).then((res) => res.data);
};

export const doPost = (actionName, reqBody = {}, header) => {
  let url = getURL(actionName);
  return httpInstance.post(url, reqBody, header).then((res) => res.data);
};

export const doPut = (actionName, reqBody = {},header) => {
  let url = getURL(actionName);
  return httpInstance.put(url, reqBody, header).then((res) => res.data);
};

export const doDelete = (url, reqBody = {}, header) => {
  // let url = getURL(actionName);
  return httpInstance.delete(url, reqBody, header).then((res) => res.data);
};

export const defaultHeader = (header) => {
  return {
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
  };
};
