import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { AppBarProps } from "./index.types";
import * as Styled from "./index.styles";
import { useAppDispatch } from "@/hooks/useReduxHook";
import { clearUser } from "@/libs/userSlice";
import { persistor } from "@/main";

function AppBar({ title, disableBack }: AppBarProps) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await persistor.purge();
      dispatch(clearUser());
      navigate("/auth/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        console.log(error.message);
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
        <Styled.AppBarPoint onClick={handleLogout}>
          <Chip
            variant="outlined"
            color="primary"
            icon={<MonetizationOnIcon />}
            label="100"
          />
        </Styled.AppBarPoint>
      </div>
    </Styled.AppBarWrap>
  );
}

export default AppBar;
