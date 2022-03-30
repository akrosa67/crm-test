import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_MENU } from "../ActionTypes";

const doGetMenuHeader = () => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("DO_GET_MENU",header)
      .then((response) => {
        dispatch({ type: DO_GET_MENU, data: response });
      })
      .catch((error) => {
        dispatch({
          type: DO_GET_MENU,
          data:
            error.response && error.response.data.message
              ? error.response.data
              : error.message,
        });
      });
  };
};
export default doGetMenuHeader;
