import { Typography } from "@mui/material";
import DailyCheckTitleWrap from "./DailyCheckTitle.styles";

function DailyCheckTitle() {
  return (
    <DailyCheckTitleWrap>
      <Typography className="tab-cols date" variant="body2" fontWeight={700}>
        Date
      </Typography>
      <Typography className="tab-cols" variant="body2" fontWeight={700}>
        RECORD
      </Typography>
      <Typography className="tab-cols long" variant="body2" fontWeight={700}>
        BOOK READING
      </Typography>
      <Typography className="tab-cols" variant="body2" fontWeight={700}>
        WORKBOOK
      </Typography>
      <Typography className="tab-cols" variant="body2" fontWeight={700}>
        CHECK
      </Typography>
    </DailyCheckTitleWrap>
  );
}

export default DailyCheckTitle;
