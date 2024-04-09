import { Box, BoxProps, styled } from "@mui/material";

export const WeeklyLevelHomeworkItemBox = styled((props: BoxProps) => (
  <Box borderRadius={2} {...props} />
))<{ complete?: string }>(({ theme, complete }) => ({
  border: `1px solid ${
    complete === "true"
      ? theme.palette.primary.main
      : theme.palette.secondary.main
  }`,
}));
