import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../navigation";
import PageLayoutWrap from "./PageLayout.styles";
import useAuthChange from "@/hooks/useAuthChange";
import { Toaster } from "react-hot-toast";

function PageLayout() {
  useAuthChange();
  const { pathname } = useLocation();
  return (
    <PageLayoutWrap>
      <Toaster />
      <Outlet />
      <Navigation pathname={pathname} />
    </PageLayoutWrap>
  );
}

export default PageLayout;
