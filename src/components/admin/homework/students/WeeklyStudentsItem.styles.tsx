import { Grid, GridProps, styled } from "@mui/material";

export const WeeklyStudentsItemWrap = styled((props: GridProps) => (
  <Grid
    component="tr"
    container
    spacing={{ xs: 1, md: 1.5 }}
    pt={{ xs: 1, md: 1.5 }}
    {...props}
  />
))(({ theme }) => ({
  borderBottom: `1px solid ${
    theme.palette.mode === "light"
      ? theme.palette.lightGray.main
      : theme.palette.lightGray.dark
  }`,
}));

export const WeeklyStudentsItemCell = styled((props: GridProps) => (
  <Grid item xs={1.5} p={{ xs: 1, md: 1.5 }} {...props} />
))``;
