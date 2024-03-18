import { useAppSelector } from "@/hooks/useReduxHook";
import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const withAuth =
  (Component: ComponentType) =>
  <P extends object>(props: P) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.uid);
    useEffect(() => {
      if (user === null) navigate("/auth/login");
    }, [navigate, user]);

    return <Component {...props} />;
  };

export default withAuth;
