import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthChange from "@/hooks/useAuthChange";
import * as Styled from "./AdminLayout.styles";
import AdminNavigation from "@/components/admin/navigation";

function AdminLayout() {
  useAuthChange();

  return (
    <Styled.AdminLayoutWrap>
      <Toaster />
      <AdminNavigation />
      <Styled.AdminLayoutContent p={2}>
        <Outlet />
      </Styled.AdminLayoutContent>
    </Styled.AdminLayoutWrap>
  );
}

export default AdminLayout;
