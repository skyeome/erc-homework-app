import { Outlet } from "react-router-dom";
import CenterLayout from "./AuthLayout.styles";

function AuthLayout() {
  return (
    <CenterLayout>
      <Outlet />
    </CenterLayout>
  );
}

export default AuthLayout;
