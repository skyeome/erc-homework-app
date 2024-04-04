import { styled } from "@mui/material";
import { drawerWidth } from "./AdminLayout";

export const AdminLayoutWrap = styled("div")`
  display: flex;
`;

export const AdminLayoutContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(3),
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.lightBg.main
      : theme.palette.lightBg.dark,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
