import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { AppBarProps } from "./index.types";
import * as Styled from "./index.styles";

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
          <Chip
            variant="outlined"
            color="primary"
            icon={<MonetizationOnIcon />}
            label="100"
          />
        </Styled.AppBarPoint>
        {/* <Styled.AppBarPoint>
          <img src={coin} alt="$" />
          <Typography variant="body2">100</Typography>
        </Styled.AppBarPoint> */}
      </div>
    </Styled.AppBarWrap>
  );
}

export default AppBar;
