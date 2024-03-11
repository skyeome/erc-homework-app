import { styled } from "@mui/material";

export const tabCols = {
  "& .tab-cols": {
    width: "22%",
    textAlign: "center",
  },
  "& .tab-cols.date": {
    width: "12%",
  },
  "& .tab-cols.long": {
    letterSpacing: "-0.05em",
    whiteSpace: "nowrap",
  },
};

const DailyCheckTitleWrap = styled("div")(({ theme }) => ({
  display: "flex",

  padding: "0.75rem 0",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.textBlack.dark
      : theme.palette.textBlack.main,
  color: theme.palette.background.paper,

  ...tabCols,
}));

export default DailyCheckTitleWrap;
