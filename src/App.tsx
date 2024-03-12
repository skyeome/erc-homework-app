import React from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import BrowserRoutes from "./components/common/BrowserRoutes";
import customTheme from "./theme";
import client from "./libs/client";
import { QueryClientProvider } from "@tanstack/react-query";
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
      <QueryClientProvider client={client}>
        <CssBaseline />
        <BrowserRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
