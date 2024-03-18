import { useAppSelector } from "@/hooks/useReduxHook";
import { ComponentType, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export const withAuthLogin =
  (Component: ComponentType) =>
  <P extends object>(props: P) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.uid);
    useLayoutEffect(() => {
      if (user) navigate("/", { replace: true });
    }, [navigate, user]);

    return <Component {...props} />;
  };

export default withAuthLogin;