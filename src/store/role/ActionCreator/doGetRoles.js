import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_ROLES } from "../ActionTypes";

const doGetRoles = () => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("DO_GET_ROLES", header)
      .then((response) => {
        dispatch({ type: DO_GET_ROLES, data: response });
      })
      .catch((error) => {
        dispatch({
          type: DO_GET_ROLES,
          data:
            error.response && error.response.data.message
              ? error.response.data
              : error.message,
        });
      });
  };
};
export default doGetRoles;
