import { Box, Stack, styled } from "@mui/material";

export const UploadBarFixed = styled(Box)(() => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
}));

export const FixedInner = styled(Box)(() => ({
  width: "100%",
  maxWidth: "30rem",
  margin: "0 auto",
}));

export const UploadBarFixedInner = styled(FixedInner)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const UploadBtns = styled(Stack)(({ theme }) => ({
  height: "3.75rem",

  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.lightBg.dark
      : theme.palette.lightBg.main,
}));

export const UploadBarBox = styled(Stack)`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
`;

export const UploadHidden = styled("input")`
  appearance: none;
  width: 0;
  height: 0;
  visibility: hidden;
`;

export const RecorderModal = styled(FixedInner)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

export const RecorderModalContent = styled(Box)(({ theme }) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,

  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.lightBg.dark
      : theme.palette.lightBg.main,
}));
