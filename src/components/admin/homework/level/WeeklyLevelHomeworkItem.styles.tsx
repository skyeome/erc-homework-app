import { Box, BoxProps, styled } from "@mui/material";

export const WeeklyLevelHomeworkItemBox = styled((props: BoxProps) => (
  <Box borderRadius={2} p={1.5} {...props} />
))<{ complete?: string }>(({ theme, complete }) => ({
  border: `1px solid ${
    complete === "false"
      ? theme.palette.secondary.main
      : theme.palette.primary.main
  }`,
}));

export const WeeklyLevelHomeworkRecordWrap = styled(Box)`
  & audio {
    width: 100%;
    height: 3.4375rem;
  }
`;

export const WeeklyLevelHomeworkReadingWrap = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.lightBg.main
      : theme.palette.lightBg.dark,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));
