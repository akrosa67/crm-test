import { defaultHeader, doPost } from "../../../util/httpService";
import { DO_CREATE_BRANCH } from "../ActionTypes";

const doCreateBranch = (payload) => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPost("ADD_BRANCH", payload, header)
      .then((response) => {
        dispatch({
          type: DO_CREATE_BRANCH,
          data: { message: "Branch Added", status: true, data: response },
        });
      })
      .catch((error) => {
        dispatch({ type: DO_CREATE_BRANCH, data: error });
      });
  };
};

export default doCreateBranch;
