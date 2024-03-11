import { Box, styled } from "@mui/material";

export const SelectDateArea = styled("div")``;

export const SelectDateModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: "100%",
  maxWidth: "30rem",

  backgroundColor: theme.palette.background.paper,
}));
