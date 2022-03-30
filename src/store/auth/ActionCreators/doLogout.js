import { DO_LOGOUT } from "../ActionTypes";
import { doGet } from "../../../util/httpService";

const doLogout = (userInfo) => {
  return (dispatch) => {
    doGet("DO_LOGOUT", {
      headers: { Authorization: `Bearer ${userInfo.data.sessionInfo.token}` },
    })
      .then((response) => {
        localStorage.removeItem("userInfo");
        dispatch({
          type: DO_LOGOUT,
          data: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: DO_LOGOUT,
          data:
            error.response && error.response.data.message
              ? error.response.data
              : error.message,
        });
      });
  };
};

export default doLogout;
