import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Divider,
  IconButton,
  List,
  Typography,
  useTheme,
} from "@mui/material";
import { getLevels } from "@/api/admin";
import ClassIcon from "@mui/icons-material/Class";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import ListItemLink from "../menuList";
import AdminNaviWrap from "./AdminNaviWrap";
import DrawerHeader from "./index.styles";
import { AdminNavigationProps } from "./index.types";

function AdminNavigation({ open, handleClose }: AdminNavigationProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["levels", "list"],
    queryFn: getLevels,
  });

  return (
    <AdminNaviWrap open={open}>
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
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
      {isLoading ? (
        <CircularProgress />
      ) : data !== undefined ? (
        <List aria-label="Homeworks">
          <ListItemLink
            to="/admin/homework"
            primary="All Students"
            icon={<SchoolIcon />}
            active={pathname.endsWith("homework")}
          />
          {data.map((el, index) => (
            <ListItemLink
              key={index}
              to={`/admin/homework/${el}`}
              primary={el}
              icon={<ClassIcon />}
              active={pathname.endsWith(el)}
            />
          ))}
        </List>
      ) : null}
      <Divider />
    </AdminNaviWrap>
  );
}

export default AdminNavigation;
