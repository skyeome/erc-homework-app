import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Styled from "./WeeklyRecord.styles";

const weekItems = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."];
const weekCheck = [true, true, true, false, false];

function WeeklyRecord() {
  return (
    <Styled.WeeklyRecordFixed>
      <div className="inner">
        <div className="weeks-title">
          {weekItems.map((item) => (
            <Typography key={item} variant="body2">
              {item}
            </Typography>
          ))}
        </div>
        <div className="weeks-check">
          {weekCheck.map((item, index) => (
            <Styled.WeeklyCheckItem key={index}>
              {item ? (
                <CheckCircleIcon
                  color="primary"
                  sx={{ fontSize: "2.4rem", marginLeft: "-3px" }}
                />
              ) : (
                <Box></Box>
              )}
            </Styled.WeeklyCheckItem>
          ))}
        </div>
        <div className="week-bg">
          {weekCheck.map((item, index) => (
            <Styled.WeeklyCheckBgItem
              key={index}
              className="week-bg-item"
              ischecked={`${item}`}
            />
          ))}
        </div>
      </div>
    </Styled.WeeklyRecordFixed>
  );
}

export default WeeklyRecord;
