import { defaultHeader, doPut } from "../../../util/httpService";
import { DO_SAVE_COMPANY } from "../ActionTypes";

const doSaveCompany = (payload) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPut("UPDATE_COMPANY_BY_ID", payload,header)
      .then((response) => {
        dispatch({
          type: DO_SAVE_COMPANY,
          data: { message: "Company Saved", status: true, data: response },
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_SAVE_COMPANY, data: error });
      });
  };
};

export default doSaveCompany;
