import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_COUNTRIES } from "../ActionTypes";

const doGetCountries = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_COUNTRY",header)
      .then((response) => {
        dispatch({ type: DO_GET_COUNTRIES, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_COUNTRIES, data: error });
      });
  };
};

export default doGetCountries;
