import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import coin from "@/assets/coin_icon.svg";
import { AppBarProps } from "./index.types";
import * as Styled from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function AppBar({ title, disableBack }: AppBarProps) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
        <Styled.AppBarPoint>
          <img src={coin} alt="$" />
          <Typography variant="body2">100</Typography>
        </Styled.AppBarPoint>
      </div>
    </Styled.AppBarWrap>
  );
}

export default AppBar;
