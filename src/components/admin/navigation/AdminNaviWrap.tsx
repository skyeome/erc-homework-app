import { Drawer, DrawerProps, styled } from "@mui/material";

export const AdminNaviWrap = styled((props: DrawerProps) => (
  <Drawer variant="persistent" anchor="left" {...props} />
))(() => ({
  width: 200,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 200,
    boxSizing: "border-box",
  },
  "& a": {
    color: "inherit",
  },
}));

export default AdminNaviWrap;
