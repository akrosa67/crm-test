import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doToggleSnackbarClose } from "../../store/master/ActionCreators";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const ZGCustomSnackbar = ({ timeout }) => {
  const dispatch = useDispatch();
  const master = useSelector((store) => store.master);
  const { toggleSnackbar, snackbarMessage } = master;
  const { message, type } = snackbarMessage;
  const actions = {
    closeSanckBar: () => dispatch(doToggleSnackbarClose()),
  };

  let TIME = (timeout - 500) / 1000 + "s";

  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      actions.closeSanckBar();
    }, timeout);
  }

  function handleClose() {
    clearTimeout(TIMER);
    actions.closeSanckBar();
  }
  useEffect(() => {
    if (toggleSnackbar) {
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [toggleSnackbar, TIMER]);
  return (
    <Snackbar
      time={TIME}
      open={toggleSnackbar}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
