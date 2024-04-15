import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { persistor } from "@/libs/store";
import { clearUser } from "@/libs/userSlice";
import { useAppDispatch } from "@/hooks/useReduxHook";
import { FirebaseError } from "firebase/app";
import { getLevels } from "@/api/admin";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemLink from "../menuList";
import AdminNaviWrap from "./AdminNaviWrap";
import { AdminNavigationProps } from "./index.types";
import DrawerHeader from "./index.styles";
import { clearTeacher } from "@/libs/adminSlice";
import client from "@/libs/client";

function AdminNavigation({ open, handleClose }: AdminNavigationProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["levels", "list"],
    queryFn: getLevels,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      await signOut(auth);
      await persistor.purge();
      dispatch(clearUser());
      dispatch(clearTeacher());
      client.removeQueries();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        console.log(error.message);
      }
    }
  };

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
        <ListItemLink
          to="/admin/teacher"
          primary="Teachers"
          icon={<PeopleAltIcon />}
          active={pathname.startsWith("/admin/teacher")}
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
          icon={<SchoolIcon />}
          active={pathname.endsWith("homework")}
        />
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((el) => (
              <Box component="li" key={el} px={2} py={1.5} height={44.5}>
                <Skeleton />
              </Box>
            ))}
          </>
        ) : data !== undefined ? (
          <>
            {data.map((el, index) => (
              <ListItemLink
                key={index}
                to={`/admin/homework/${el}`}
                primary={el}
                icon={<ClassIcon />}
                active={pathname.endsWith(el)}
              />
            ))}
          </>
        ) : null}
      </List>
      <Divider />
      <List aria-label="Logout">
        <ListItemButton onClick={onClickLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </AdminNaviWrap>
  );
}

export default AdminNavigation;
