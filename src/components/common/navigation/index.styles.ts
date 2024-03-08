import { styled } from "@mui/material";
import { NavigationItemProps } from "./index.types";

export const NavigationWrap = styled("nav")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: 10,

  width: "100%",
  height: "5rem",

  "& .inner": {
    display: "flex",
    listStyle: "none",

    maxWidth: "30rem",
    height: "100%",
    margin: "0 auto",
    padding: 0,

    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.lightBg.dark
        : theme.palette.lightBg.main,
  },
}));

export const NavigationItem = styled("li")<NavigationItemProps>(
  ({ theme, active }) => ({
    flex: 1,
    textAlign: "center",
    paddingTop: ".75rem",
    borderTop:
      active === "true"
        ? `2px solid ${theme.palette.primary.main}`
        : "2px solid transparent",

    a: {
      color:
        active === "true"
          ? theme.palette.primary.main
          : theme.palette.mode === "dark"
          ? theme.palette.darkGray.dark
          : theme.palette.darkGray.main,
      textDecoration: "none",
    },
  })
);
