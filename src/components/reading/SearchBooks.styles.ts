import { styled } from "@mui/material";

const RecentSearchItems = styled("ul")(({ theme }) => ({
  padding: 0,
  li: {
    padding: "0.625rem 0",
    listStyle: "none",
    borderBottom: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.lightGray.dark
        : theme.palette.lightGray.main
    }`,
    a: {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

export default RecentSearchItems;
