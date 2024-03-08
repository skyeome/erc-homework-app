import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../navigation";
import PageLayoutWrap from "./PageLayout.styles";

function PageLayout() {
  const { pathname } = useLocation();
  return (
    <PageLayoutWrap>
      <Outlet />
      <Navigation pathname={pathname} />
    </PageLayoutWrap>
  );
}

export default PageLayout;
