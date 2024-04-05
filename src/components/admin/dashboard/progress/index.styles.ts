import { styled } from "@mui/material";

export const ProgressBarBg = styled("div")(({ theme }) => ({
  position: "relative",

  width: 240,
  height: 6,
  borderRadius: 6,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.lightBg.main
      : theme.palette.lightBg.dark,
}));
export const ProgressBar = styled("div")<{ percent: string }>(
  ({ theme, percent }) => ({
    position: "absolute",
    top: 0,
    left: 0,

    width: `${percent}%`,
    height: "100%",
    borderRadius: 6,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.primary.dark,
  })
);
