import { Typography } from "@mui/material";
import awesome from "@/assets/awesome.webp";
import SallyCheckWrap from "./SallyCheck.styles";

function SallyCheck() {
  return (
    <SallyCheckWrap>
      <Typography variant="h3" fontWeight={700}>
        Sally’s check
      </Typography>
      <img src={awesome} alt="awesome!" />
    </SallyCheckWrap>
  );
}

export default SallyCheck;
