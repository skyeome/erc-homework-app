import { Box, styled } from "@mui/material";

const RecordNoticeWrap = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.lightBg.dark
      : theme.palette.lightBg.main,
  padding: "1.25rem 1.25rem 1.25rem 2rem",
}));

export default RecordNoticeWrap;
