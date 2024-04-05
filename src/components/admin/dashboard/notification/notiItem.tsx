import { Stack, StackProps, styled } from "@mui/material";

const NotiItem = styled((props: StackProps) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    py={1.5}
    {...props}
  />
))(({ theme }) => ({
  borderBottom: `1px solid ${
    theme.palette.mode === "light"
      ? theme.palette.lightGray.main
      : theme.palette.lightGray.dark
  }`,
}));

export default NotiItem;
