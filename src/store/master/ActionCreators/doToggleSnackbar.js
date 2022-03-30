export const doToggleSnackbarOpen = (message) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  message,
});

export const doToggleSnackbarClose = () => ({
  type: "TOGGLE_SNACKBAR_CLOSE",
});
