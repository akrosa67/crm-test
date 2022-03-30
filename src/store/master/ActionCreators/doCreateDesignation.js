import { defaultHeader, doPost } from "../../../util/httpService";
import { DO_CREATE_DESIGNATION } from "../ActionTypes";

const doCreateDesignation = (payload) => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPost("ADD_DESIGNATION", payload, header)
      .then((response) => {
        dispatch({
          type: DO_CREATE_DESIGNATION,
          data: { message: "Designation Added", status: true, data: response },
        });
      })
      .catch((error) => {
        dispatch({ type: DO_CREATE_DESIGNATION, data: error });
      });
  };
};

export default doCreateDesignation;
