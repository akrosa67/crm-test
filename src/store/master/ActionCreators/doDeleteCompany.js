import { defaultHeader, doDelete } from "../../../util/httpService";
import { DO_DELETE_COMPANY } from "../ActionTypes";

const doDeleteCompany = (companyId) => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doDelete(`delete_company_by_id?companyId=${companyId}`,header)
      .then((response) => {
        dispatch({
          type: DO_DELETE_COMPANY,
          data: response,
        });
      })
      .catch(function (error) {
        dispatch({ type: DO_DELETE_COMPANY, data: error });
      });
  };
};

export default doDeleteCompany;
