import { defaultHeader, doPut } from "../../../util/httpService";
import { DO_SAVE_BRANCH } from "../ActionTypes";

const doSaveBranch = (payload) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPut("DO_SAVE_BRANCH", payload,header)
      .then((response) => {
        dispatch({
          type: DO_SAVE_BRANCH,
          data: { status: true, message: "Branch Saved", data: response },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_SAVE_BRANCH, data: error });
      });
  };
};

export default doSaveBranch;
