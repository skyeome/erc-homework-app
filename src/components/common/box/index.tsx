import { Box, BoxProps, styled } from "@mui/material";

const ShadowBox = styled((props: BoxProps) => (
  <Box borderRadius={2} boxShadow={2} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default ShadowBox;
