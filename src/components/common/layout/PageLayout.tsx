import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../navigation";
import PageLayoutWrap from "./PageLayout.styles";
import useAuthChange from "@/hooks/useAuthChange";
import withAuth from "../hoc/withAuth";

const PageLayout = withAuth(() => {
  useAuthChange();
  const { pathname } = useLocation();
  return (
    <PageLayoutWrap>
      <Outlet />
      <Navigation pathname={pathname} />
    </PageLayoutWrap>
  );
});

export default PageLayout;
