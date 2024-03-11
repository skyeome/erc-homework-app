import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    lightBg: Palette["primary"];
    darkGray: Palette["primary"];
    textBlack: Palette["primary"];
  }

  interface PaletteOptions {
    lightBg?: PaletteOptions["primary"];
    darkGray?: PaletteOptions["primary"];
    textBlack?: PaletteOptions["primary"];
  }
}

const customTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#65C3C8", contrastText: "#fff" },
      secondary: { main: "#D82F57", contrastText: "#fff" },
      lightBg: { main: "#F7F7F7", dark: "#171717" },
      darkGray: { main: "#939393", dark: "#666666" },
      textBlack: { main: "#333", dark: "#939393" },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: 12,
      h3: {
        fontSize: 24,
      },
      h4: {
        fontSize: 16,
      },
      h5: {
        fontSize: 14,
      },
      h6: {
        fontSize: 12,
      },
    },
  });

export default customTheme;
