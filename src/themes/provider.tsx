import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { purpleTheme } from "./theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
