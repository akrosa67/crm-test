import { defaultHeader, doPut } from "../../../util/httpService";
import { DO_SAVE_DEPARTMENT } from "../ActionTypes";

const doSaveDepartment = (payload) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPut("UPDATE_DEPARTMENT_BY_ID", payload,header)
      .then((response) => {
        dispatch({
          type: DO_SAVE_DEPARTMENT,
          data: { message: "Department Saved", status: true, data: response },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_SAVE_DEPARTMENT, data: error });
      });
  };
};

export default doSaveDepartment;
