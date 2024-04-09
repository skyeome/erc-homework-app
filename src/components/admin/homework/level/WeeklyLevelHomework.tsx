import { format } from "date-fns";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { WeeklyLevelHomeworkProps } from "./WeeklyLevelHomework.types";

function WeeklyLevelHomework({ date, category }: WeeklyLevelHomeworkProps) {
  return (
    <Paper sx={{ minHeight: 549 }}>
      <Typography variant="h3" fontWeight={700} p={3}>
        {format(date, "yyyy-MM-dd")}
      </Typography>
      <Divider />
      {/* 클래스별 숙제 컴포넌트 */}
      <Box p={3}>
        <Typography variant="h4" fontWeight={700}>
          {category}
        </Typography>
        {category === "record" && (
          <WeeklyLevelRecord date={date} category="record" />
        )}
        {category === "reading" && (
          <WeeklyLevelReading date={date} category="reading" />
        )}
        {category === "workbook" && (
          <WeeklyLevelWorkbook date={date} category="workbook" />
        )}
      </Box>
    </Paper>
  );
}

const WeeklyLevelRecord = (props: WeeklyLevelHomeworkProps) => {
  return <div>Record</div>;
};
const WeeklyLevelReading = (props: WeeklyLevelHomeworkProps) => {
  return <div>Reading</div>;
};
const WeeklyLevelWorkbook = (props: WeeklyLevelHomeworkProps) => {
  return <div>Workbook</div>;
};

export default WeeklyLevelHomework;
