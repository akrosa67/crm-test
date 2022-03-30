import { defaultHeader, doGet } from "../../../util/httpService";
import { GET_ALL_DEPARTMENT } from "../ActionTypes";

const doGetDepartment = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_DEPARTMENT", header)
      .then((response) => {
        dispatch({ type: GET_ALL_DEPARTMENT, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: GET_ALL_DEPARTMENT, data: error });
      });
  };
};

export default doGetDepartment;
