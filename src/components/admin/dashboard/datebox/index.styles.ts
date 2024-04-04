import { Box, styled } from "@mui/material";
import { DateBoxDayProps } from "./index.types";

const DateBoxDay = styled(Box)<DateBoxDayProps>(({ theme, isactive }) => ({
  backgroundColor:
    isactive === "true"
      ? theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.primary.dark
      : "transparent",
  borderRadius: "4rem",
  color:
    isactive === "true"
      ? "white"
      : theme.palette.mode === "light"
      ? theme.palette.textBlack.main
      : "white",
}));

export default DateBoxDay;
