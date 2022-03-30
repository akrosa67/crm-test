import { DO_GET_COMPANY } from "../ActionTypes";
import { defaultHeader, doGet } from "../../../util/httpService";

const doGetCompany = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_COMPANY", header)
      .then((response) => {
        dispatch({ type: DO_GET_COMPANY, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_COMPANY, data: error });
      });
  };
};

export default doGetCompany;
