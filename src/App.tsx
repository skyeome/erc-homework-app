import React from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import BrowserRoutes from "./components/common/BrowserRoutes";
import customTheme from "./theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => customTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRoutes />
    </ThemeProvider>
  );
}

export default App;
