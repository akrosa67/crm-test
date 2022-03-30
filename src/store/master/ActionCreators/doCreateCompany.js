import { defaultHeader, doPost } from "../../../util/httpService";
import { DO_CREATE_COMPANY } from "../ActionTypes";

const doCreateCompany = (payload) => {
  return (dispatch, getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doPost("ADD_COMPANY", payload, header)
      .then((response) => {
        dispatch({
          type: DO_CREATE_COMPANY,
          data: { message: "Company Added", status: true, data: response },
        });
      })
      .catch((error) => {
        dispatch({ type: DO_CREATE_COMPANY, data: error });
      });
  };
};

export default doCreateCompany;
