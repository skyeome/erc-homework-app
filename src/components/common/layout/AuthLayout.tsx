import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CenterLayout from "./AuthLayout.styles";

function AuthLayout() {
  return (
    <CenterLayout>
      <Toaster />
      <Outlet />
    </CenterLayout>
  );
}

export default AuthLayout;
