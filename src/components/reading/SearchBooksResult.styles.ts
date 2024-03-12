import { Box, Typography, styled } from "@mui/material";

export const BookSearchResultItem = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.lightGray.dark
      : theme.palette.lightGray.main
  }`,

  "& .img-area": {
    maxWidth: 70,
    maxHeight: 110,
    "& img": {
      width: "100%",
    },
  },
}));

export const BookTitle = styled(Typography)(() => ({
  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  wordBreak: "break-word",

  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

// export const BookSearchResultSkeleton = styled(Box)(({ theme }) => ({}));
