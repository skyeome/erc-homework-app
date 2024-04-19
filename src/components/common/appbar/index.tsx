import { useNavigate } from "react-router-dom";
import { MouseEvent, useCallback, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBarProps } from "./index.types";
import * as Styled from "./index.styles";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { clearUser } from "@/libs/userSlice";
import { persistor } from "@/libs/store";
import client from "@/libs/client";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/auth";

function AppBar({ title, disableBack }: AppBarProps) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 유저 포인트 가져오기
  const uid = useAppSelector((state) => state.user.uid);
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(uid ?? ""),
  });

  // 메뉴 열기/닫기 관련 state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await persistor.purge();
      dispatch(clearUser());
      client.removeQueries();
      navigate("/auth/login", { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Styled.AppBarWrap>
      <div className="inner">
        <Styled.AppBarBackBtn>
          {!disableBack && (
            <Button
              size="small"
              startIcon={<ChevronLeftIcon fontSize="large" />}
              onClick={goBack}
            >
              Back
            </Button>
          )}
        </Styled.AppBarBackBtn>
        <Styled.AppBarTitle>
          <Typography variant="h4" align="center" fontWeight="medium">
            {title}
          </Typography>
        </Styled.AppBarTitle>
        <Styled.AppBarPoint onClick={handleClick}>
          <Chip
            variant="outlined"
            color="primary"
            icon={<MonetizationOnIcon />}
            label={data?.points}
          />
        </Styled.AppBarPoint>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </Styled.AppBarWrap>
  );
}

export default AppBar;
