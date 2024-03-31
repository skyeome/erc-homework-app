import { Box, Typography, styled } from "@mui/material";

export const ReadBooksDetailItemWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.lightGray.dark
      : theme.palette.lightGray.main
  }`,
  "& .thumb-wrap": {
    flexShrink: 0,
    width: 120,
    height: 90,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  "& .text-area": {
    flexShrink: 1,
  },
}));

export const ReadBooksDetailItemTitle = styled(Typography)`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
