import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DownloadIcon from "@mui/icons-material/Download";
import { WeeklyLevelHomeworkProps } from "./WeeklyLevelHomework.types";
import {
  getReadingByLevelAndDate,
  getRecordByLevelAndDate,
  getWorkbookByLevelAndDate,
} from "@/api/admin";
import WeeklyLevelHomeworkItem from "./WeeklyLevelHomeworkItem";

function WeeklyLevelHomework({ date, category }: WeeklyLevelHomeworkProps) {
  return (
    <Paper sx={{ minHeight: 549 }}>
      <Typography variant="h3" fontWeight={700} p={3}>
        {category + " / " + format(date, "yyyy-MM-dd")}
      </Typography>
      <Divider />
      {/* 클래스별 숙제 컴포넌트 */}
      <Box p={3}>
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

// Record 숙제 컴포넌트
const WeeklyLevelRecord = ({ date, category }: WeeklyLevelHomeworkProps) => {
  const { data } = useQuery({
    queryKey: ["homeworks", category, date],
    queryFn: () => getRecordByLevelAndDate("", date),
  });
  return (
    <Grid container>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={12} lg={6}>
          <WeeklyLevelHomeworkItem>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={700}>
                {item.name}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1}>
                <a href={item.recordUrl} download>
                  <DownloadIcon sx={{ verticalAlign: "middle" }} />
                </a>
                <Button variant="contained">Check</Button>
              </Stack>
            </Stack>
            <WeeklyLevelHomeworkItem.Record data={item} />
          </WeeklyLevelHomeworkItem>
        </Grid>
      ))}
    </Grid>
  );
};

// Reading 숙제 컴포넌트
const WeeklyLevelReading = ({ date, category }: WeeklyLevelHomeworkProps) => {
  const { data } = useQuery({
    queryKey: ["homeworks", category, date],
    queryFn: () => getReadingByLevelAndDate("", date),
  });
  return (
    <Grid container>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={12} lg={6}>
          <WeeklyLevelHomeworkItem key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={700}>
                {item.name}
              </Typography>
              <Button variant="contained">Check</Button>
            </Stack>
            <WeeklyLevelHomeworkItem.Reading data={item} />
          </WeeklyLevelHomeworkItem>
        </Grid>
      ))}
    </Grid>
  );
};

// Workbook/other 숙제 컴포넌트
const WeeklyLevelWorkbook = ({ date, category }: WeeklyLevelHomeworkProps) => {
  const { data } = useQuery({
    queryKey: ["homeworks", category, date],
    queryFn: () => getWorkbookByLevelAndDate("", date),
  });
  return (
    <Grid container>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={12} lg={6}>
          <WeeklyLevelHomeworkItem key={item.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={700}>
                {item.name}
              </Typography>
              <Button variant="contained">Check</Button>
            </Stack>
            <WeeklyLevelHomeworkItem.Workbook data={item} />
          </WeeklyLevelHomeworkItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklyLevelHomework;
