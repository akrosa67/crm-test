import { defaultHeader, doPut } from "../../../util/httpService";
import { DO_SAVE_DESIGNATION } from "../ActionTypes";

const doSaveDesignation = (payload) => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPut("UPDATE_DESIGNATION_BY_ID", payload, header)
      .then((response) => {
        dispatch({
          type: DO_SAVE_DESIGNATION,
          data: { message: "Designation Saved", status: true, data: response },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_SAVE_DESIGNATION, data: error });
      });
  };
};

export default doSaveDesignation;
