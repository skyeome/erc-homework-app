import { useQuery } from "@tanstack/react-query";
import { getThisWeekRecord } from "@/api/record";
import { useAppSelector } from "@/hooks/useReduxHook";
import { generateWeekDates } from "@/hooks/getWeekDate";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Styled from "./WeeklyRecord.styles";

const weekItems = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."];

function WeeklyRecord() {
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["record", "weekly"],
    queryFn: () => getThisWeekRecord(uid),
  });

  // 이번 주 월요일부터 금요일까지의 날짜 배열 생성
  const weekDates = generateWeekDates();

  // 이번 주 월요일부터 금요일까지의 숙제 완료 여부 배열 생성
  const status = weekDates.map((date) => {
    const found = data?.find((homework) => {
      const homeworkDate = homework.date.toDate(); // Firestore에서 가져온 데이터의 날짜
      return homeworkDate.toDateString() === date.toDateString();
    });
    return !!found;
  });

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
          {status.map((item, index) => (
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
          {status.map((item, index) => (
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
