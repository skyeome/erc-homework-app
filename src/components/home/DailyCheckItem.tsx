import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import oMark from "@/assets/o.webp";
import xMark from "@/assets/x.webp";
import { DailyCheckItemProps } from "./DailyCheckItem.types";
import DailyCheckItemWrap from "./DailyCheckItem.styles";
import { Box } from "@mui/material";

const checkImage = (data?: boolean) => {
  if (data === undefined) return <Box sx={{ height: "3rem" }} />;
  return data ? (
    <img src={oMark} alt="O" className="status-success" />
  ) : (
    <img src={xMark} alt="X" className="status-fail" />
  );
};

function DailyCheckItem({ data, date }: DailyCheckItemProps) {
  return (
    <DailyCheckItemWrap>
      <div className="tab-cols date">
        <Typography variant="body2">{date}</Typography>
      </div>
      <div className="tab-cols">{checkImage(data.record)}</div>
      <div className="tab-cols">{checkImage(data.reading)}</div>
      <div className="tab-cols">{checkImage(data.workbook)}</div>
      <div className="tab-cols">
        {data.checked && (
          <CheckCircleIcon color="primary" sx={{ fontSize: "3rem" }} />
        )}
      </div>
    </DailyCheckItemWrap>
  );
}

export default DailyCheckItem;
