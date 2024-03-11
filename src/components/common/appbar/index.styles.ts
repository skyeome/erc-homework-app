import { styled } from "@mui/material";

export const AppBarWrap = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,

  width: "100%",
  height: "4rem",

  "& .inner": {
    display: "flex",
    alignItems: "center",

    maxWidth: "30rem",
    height: "100%",
    padding: "0 1rem 0 0.5rem",
    margin: "0 auto",

    background: theme.palette.background.paper,
  },
}));

export const AppBarBackBtn = styled("div")`
  width: 3.75rem;
  margin-right: 0.5rem;
`;

export const AppBarTitle = styled("div")`
  flex: 1;
`;

export const AppBarPoint = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.125rem",

  width: "3.75rem",
  padding: ".25rem",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "2rem",

  "& img": {
    width: "1.125rem",
  },
}));
