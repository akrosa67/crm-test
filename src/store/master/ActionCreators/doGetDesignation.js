import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_DESIGNATION } from "../ActionTypes";

const doGetDesignation = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_DESIGNATION",header)
      .then((response) => {
        dispatch({ type: DO_GET_DESIGNATION, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_DESIGNATION, data: error });
      });
  };
};

export default doGetDesignation;
