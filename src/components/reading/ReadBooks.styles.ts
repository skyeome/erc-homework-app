import { styled } from "@mui/material";
import bookshelf from "@/assets/bookshelf.webp";

export const ReadBooksList = styled("ul")`
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  gap: 3rem 0;

  padding: 2rem 1.25rem 6rem;
  margin: 0;
  list-style: none;
  background-image: url(${bookshelf});
  background-size: 2px;
`;

export const ReadBooksItem = styled("li")(({ theme }) => ({
  width: "33.3333%",
  height: 110,

  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",

  [theme.breakpoints.up("sm")]: {
    width: "25%",
  },

  "& img": {
    width: 70,
  },
}));
