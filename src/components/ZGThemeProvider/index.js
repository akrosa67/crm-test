import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
export const ZGThemeProvider = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
