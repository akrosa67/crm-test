import { defaultHeader, doDelete } from "../../../util/httpService";
import { DO_DELETE_DESIGNATION } from "../ActionTypes";

const doDeleteDesignation = (deptId) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doDelete(`delete_designation_by_id?designationId=${deptId}`,header)
      .then((response) => {
        dispatch({
          type: DO_DELETE_DESIGNATION,
          data: response,
        });
        console.log(response)
      })
      .catch(function (error) {
        dispatch({ type: DO_DELETE_DESIGNATION, data: error });
      });
  };
};

export default doDeleteDesignation;
