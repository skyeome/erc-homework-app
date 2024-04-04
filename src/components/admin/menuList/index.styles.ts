import { styled } from "@mui/material";
import { ListItemWrapProps } from "./index.types";

const ListItemWrap = styled("li")<ListItemWrapProps>(({ theme, isactive }) => ({
  backgroundColor: `${
    isactive === "true"
      ? theme.palette.mode === "light"
        ? theme.palette.lightBg.main
        : theme.palette.lightBg.dark
      : "transparent"
  }`,
}));

export default ListItemWrap;
