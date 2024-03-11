import { Box, styled } from "@mui/material";

export const SelectDateArea = styled(Box)(({ theme }) => ({
  padding: "0.825em",
  borderRadius: ".5rem",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.lightGray.dark
      : theme.palette.lightGray.main
  }`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.lightBg.dark
      : theme.palette.lightBg.main,
  cursor: "pointer",
}));

export const SelectDateModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "100%",
  maxWidth: "30rem",

  backgroundColor: theme.palette.background.paper,
}));
