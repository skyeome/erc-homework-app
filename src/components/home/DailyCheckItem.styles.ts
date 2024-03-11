import { styled } from "@mui/material";
import { tabCols } from "./DailyCheckTitle.styles";

const DailyCheckItemWrap = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: "0.75rem 0",
  "&:nth-child(odd)": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.lightBg.dark
        : theme.palette.lightBg.main,
  },

  ...tabCols,

  "& .status-success": {
    width: "3rem",
  },
  "& .status-fail": {
    width: "2.625rem",
  },
}));

export default DailyCheckItemWrap;
