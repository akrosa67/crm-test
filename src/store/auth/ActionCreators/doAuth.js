import { DO_AUTHENTICATE } from "../ActionTypes";
import { doGet } from "../../../util/httpService";

const doAuth = () => {
  return (dispatch) => {
    doGet("DO_LOGIN", "")
      .then((response) => {
        dispatch({ type: DO_AUTHENTICATE, data: response });
      })
      .catch(function (error) {
        dispatch({ type: DO_AUTHENTICATE, data: error });
      });
  };
};

export default doAuth;
