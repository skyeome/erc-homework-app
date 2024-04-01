import { Grid, styled } from "@mui/material";

const ReadBooksDetailItemWrap = styled(Grid)(() => ({
  "& .thumb-wrap": {
    aspectRatio: "4/3",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      verticalAlign: "top",
    },
  },
}));

export default ReadBooksDetailItemWrap;
