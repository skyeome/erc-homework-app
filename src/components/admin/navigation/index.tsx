import { useLocation } from "react-router-dom";
import { Divider, List, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListItemLink from "../menuList";
import * as Styled from "./index.styles";

function AdminNavigation() {
  const { pathname } = useLocation();

  return (
    <Styled.AdminNaviWrap>
      <Typography variant="h4" fontWeight={700} pt={3} pl={2} pb={1}>
        Dashboard
      </Typography>
      <List aria-label="Home">
        <ListItemLink
          to="/admin"
          primary="Home"
          icon={<HomeIcon />}
          active={pathname.endsWith("admin")}
        />
      </List>
      <Divider />
      <Typography variant="h4" fontWeight={700} pt={3} pl={2} pb={1}>
        Manage
      </Typography>
      <List aria-label="Users">
        <ListItemLink
          to="/admin/user"
          primary="Users"
          icon={<PeopleAltIcon />}
          active={pathname.startsWith("/admin/user")}
        />
      </List>
      <Divider />
      <Typography variant="h4" fontWeight={700} pt={3} pl={2} pb={1}>
        Homeworks
      </Typography>
      <List aria-label="Homeworks">
        <ListItemLink
          to="/admin/homework"
          primary="All Students"
          icon={<PeopleAltIcon />}
          active={pathname.startsWith("/admin/homework")}
        />
      </List>
      <Divider />
    </Styled.AdminNaviWrap>
  );
}

export default AdminNavigation;
