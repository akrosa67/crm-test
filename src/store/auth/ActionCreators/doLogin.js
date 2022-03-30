import { DO_LOGIN } from "../ActionTypes";
import { doPost } from "../../../util/httpService";

const doLogin = (payload) => {
  return (dispatch) => {
    doPost("DO_LOGIN", payload)
      .then((response) => {
        dispatch({
          type: DO_LOGIN,
          data: response,
        });
        localStorage.setItem("userInfo", JSON.stringify(response));
      })
      .catch((error) => {
        dispatch({
          type: DO_LOGIN,
          data: error.response && error.response.data.message
            ? error.response.data
            : error.message,
        });
      });
  };
};

export default doLogin;
