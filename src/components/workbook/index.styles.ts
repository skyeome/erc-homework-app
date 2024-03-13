import { Box, styled } from "@mui/material";

const WorkBookItem = styled(Box)(({ theme }) => ({
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.lightGray.dark
      : theme.palette.lightGray.main
  }`,
  "& a": {
    display: "flex",
    justifyContent: "space-between",

    padding: "0.75rem",

    color: "inherit",
    textDecoration: "none",
  },
}));

export default WorkBookItem;
