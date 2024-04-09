import { WeeklyLevelHomeworkItemProps } from "./WeeklyLevelHomeworkItem.types";
import * as Styled from "./WeeklyLevelHomeworkItem.styles";

function WeeklyLevelHomeworkItem({
  children,
  type,
}: WeeklyLevelHomeworkItemProps) {
  return (
    <Styled.WeeklyLevelHomeworkItemBox>
      {children}
      {type === "record" && <WeeklyLevelHomeworkRecord />}
      {type === "reading" && <WeeklyLevelHomeworkReading />}
      {type === "workbook" && <WeeklyLevelHomeworkWorkbook />}
    </Styled.WeeklyLevelHomeworkItemBox>
  );
}

const WeeklyLevelHomeworkRecord = () => {
  return <div>Record</div>;
};
const WeeklyLevelHomeworkReading = () => {
  return <div>Reading</div>;
};
const WeeklyLevelHomeworkWorkbook = () => {
  return <div>Workbook</div>;
};

WeeklyLevelHomeworkItem.Record = WeeklyLevelHomeworkRecord;
WeeklyLevelHomeworkItem.Reading = WeeklyLevelHomeworkReading;
WeeklyLevelHomeworkItem.Workbook = WeeklyLevelHomeworkWorkbook;

export default WeeklyLevelHomeworkItem;
