import { defaultHeader, doDelete } from "../../../util/httpService";
import { DO_DELETE_DEPARTMENT } from "../ActionTypes";

const doDeleteDepartment = (deptId) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doDelete(`delete_department_by_id?departmentId=${deptId}`,header)
      .then((response) => {
        dispatch({
          type: DO_DELETE_DEPARTMENT,
          data: {
            message: "Successfully Deleted",
            status: true,
            data: response,
          },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_DELETE_DEPARTMENT, data: error });
      });
  };
};

export default doDeleteDepartment;
