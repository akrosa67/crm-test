import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  ZGCopyRight,
  ZGThemeProvider,
  ZGButton,
  ZGTextField,
  ZGLoginGallary,
} from "../../components";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../store/auth/ActionCreators";
import { doToggleSnackbarOpen } from "../../store/master/ActionCreators";

const { home } = routes;

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [states, setStates] = useState({
    formErr: {},
    loginErr: { status: false, message: "" },
  });

  const { formErr, loginErr } = states;
  const master = useSelector((store) => store.auth);

  const { userInfo } = master;
  const actions = {
    doSignin: (data) => dispatch(doLogin(data)),
    snackbar: (message) => dispatch(doToggleSnackbarOpen(message)),
  };
  useEffect(() => {
    if (userInfo) {
      if (userInfo.success) {
        navigate("/", { state: { name: "zero gravity" } });
        setStates((prevState) => ({ ...prevState, loginErr: userInfo }));
      }
    } else {
      setStates((prevState) => ({ ...prevState, loginErr: userInfo }));
    }
    // if (loggedInfo) {
    //   navigate(home, { state: { name: "zero gravity" } });
    // }
  }, [userInfo]);

  const fieldValidation = (formValue) => {
    let { username, password } = formValue;
    let error = {};
    username ? (error.username = false) : (error.username = true);
    password ? (error.password = false) : (error.password = true);
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let logData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    var errValue = fieldValidation(logData);
    setStates((prevState) => ({ ...prevState, formErr: errValue }));

    if (!Object.values(errValue).includes(true)) {
      actions.doSignin(logData);
    }
  };

  return (
    <ZGThemeProvider>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <ZGLoginGallary />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <img height={60} src="logo.png" alt="logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <ZGTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="username"
                autoFocus
                error={formErr.username}
              />
              <ZGTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={formErr.password}
              />
              {loginErr && loginErr.status && (
                <Typography variant="caption" color="error" gutterBottom>
                  Username or Password not match
                </Typography>
              )}
              <ZGButton
                type="submit"
                id="test"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </ZGButton>
              <ZGCopyRight sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ZGThemeProvider>
  );
};
