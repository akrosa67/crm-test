import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_STATES } from "../ActionTypes";

const doGetStates = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_STATE",header)
      .then((response) => {
        dispatch({ type: DO_GET_STATES, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_STATES, data: error });
      });
  };
};

export default doGetStates;
