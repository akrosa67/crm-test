import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_BRANCH } from "../ActionTypes";

const doGetBranch = () => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("DO_GET_BRANCH", header)
      .then((response) => {
        dispatch({ type: DO_GET_BRANCH, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_BRANCH, data: error });
      });
  };
};

export default doGetBranch;
