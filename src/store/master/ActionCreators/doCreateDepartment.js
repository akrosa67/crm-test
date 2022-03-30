import { defaultHeader, doPost } from "../../../util/httpService";
import { DO_CREATE_DEPARTMENT } from "../ActionTypes";

const doCreateDepartment = (payload) => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPost("ADD_DEPARTMENT", payload, header)
      .then((response) => {
        dispatch({
          type: DO_CREATE_DEPARTMENT,
          data: { message: "Department Added", status: true, data: response },
        });
      })
      .catch((error) => {
        dispatch({ type: DO_CREATE_DEPARTMENT, data: error });
      });
  };
};

export default doCreateDepartment;
