import { defaultHeader, doGet } from "../../../util/httpService";
import { DO_GET_CITIES } from "../ActionTypes";

const doGetCities = () => {
  return (dispatch,getState) => {
    const {
      auth: { userInfo },
    } = getState();
    var header = defaultHeader({
      Authorization: `Bearer ${userInfo.data.sessionInfo.token}`,
    });
    doGet("GET_ALL_CITY",header)
      .then((response) => {
        dispatch({ type: DO_GET_CITIES, data: response.data });
      })
      .catch(function (error) {
        dispatch({ type: DO_GET_CITIES, data: error });
      });
  };
};

export default doGetCities;
