import { defaultHeader, doDelete } from "../../../util/httpService";
import { DO_DELETE_BRANCH } from "../ActionTypes";

const doDeleteBranch = (branchId) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doDelete(`delete_branch_by_id?branchId=${branchId}`,header)
      .then((response) => {
        dispatch({
          type: DO_DELETE_BRANCH,
          data: { id: branchId, status: true, message: "Branch Deleted" },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_DELETE_BRANCH, data: error });
      });
  };
};

export default doDeleteBranch;
