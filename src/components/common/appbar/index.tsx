import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import coin from "@/assets/coin_icon.svg";
import { AppBarProps } from "./index.types";
import * as Styled from "./index.styles";

function AppBar({ title }: AppBarProps) {
  return (
    <Styled.AppBarWrap>
      <div className="inner">
        <Styled.AppBarBackBtn>
          <Button size="small" startIcon={<ChevronLeftIcon fontSize="large" />}>
            Back
          </Button>
        </Styled.AppBarBackBtn>
        <Styled.AppBarTitle>
          <Typography variant="h4" align="center" fontWeight="medium">
            {title}
          </Typography>
        </Styled.AppBarTitle>
        <Styled.AppBarPoint>
          <img src={coin} alt="$" />
          <Typography>100</Typography>
        </Styled.AppBarPoint>
      </div>
    </Styled.AppBarWrap>
  );
}

export default AppBar;
