import { Box, styled } from "@mui/material";

export const AdminLayoutWrap = styled("div")`
  display: flex;
`;

export const AdminLayoutContent = styled(Box)(({ theme }) => ({
  flex: "1 0 0",
  minHeight: "100vh",

  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.lightBg.main
      : theme.palette.lightBg.dark,
}));
