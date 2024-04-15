/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAdminChange from "@/hooks/useAdminChange";
import useModal from "@/hooks/useModal";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import AdminNavigation from "@/components/admin/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import * as Styled from "./AdminLayout.styles";

export const drawerWidth = 200;

function AdminLayout() {
  useAdminChange();
  const { open, handleOpen, handleClose } = useModal();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (match) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [match]);

  return (
    <Styled.AdminLayoutWrap>
      <Toaster />
      <AdminNavigation open={open} handleClose={handleClose} />
      <Styled.AdminLayoutContent open={open}>
        <Box sx={{ height: 36 }}>
          {!open && (
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        <Outlet />
      </Styled.AdminLayoutContent>
    </Styled.AdminLayoutWrap>
  );
}

export default AdminLayout;
