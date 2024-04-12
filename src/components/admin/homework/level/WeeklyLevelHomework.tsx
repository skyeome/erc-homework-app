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
import Skeleton from "@mui/material/Skeleton";

function WeeklyLevelHomework({
  date,
  category,
  levelName,
}: WeeklyLevelHomeworkProps) {
  return (
    <Paper sx={{ minHeight: 470 }}>
      <Typography variant="h3" fontWeight={700} p={3}>
        {category + " / " + format(date, "yyyy-MM-dd")}
      </Typography>
      <Divider />
      {/* 클래스별 숙제 컴포넌트 */}
      <Box p={3}>
        {category === "record" ? (
          <WeeklyLevelRecord
            date={date}
            category="record"
            levelName={levelName}
          />
        ) : category === "reading" ? (
          <WeeklyLevelReading
            date={date}
            category="reading"
            levelName={levelName}
          />
        ) : (
          <WeeklyLevelWorkbook
            date={date}
            category={category}
            levelName={levelName}
          />
        )}
      </Box>
    </Paper>
  );
}

// skeleton
const WeeklyLevelHomeworkSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((item) => (
        <Grid item key={item} xs={12} sm={6} md={12} lg={6}>
          <WeeklyLevelHomeworkItem>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
            >
              <Typography variant="h5" fontWeight={700}>
                <Skeleton width={100} />
              </Typography>
              <Skeleton width={70} height={33} />
            </Stack>
            <Skeleton height={55} />
          </WeeklyLevelHomeworkItem>
        </Grid>
      ))}
    </Grid>
  );
};

// Record 숙제 컴포넌트
const WeeklyLevelRecord = ({
  date,
  category,
  levelName,
}: WeeklyLevelHomeworkProps) => {
  const { isLoading, data } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getRecordByLevelAndDate(levelName ?? "", date),
  });

  if (isLoading) return <WeeklyLevelHomeworkSkeleton />;
  return (
    <Grid container spacing={2}>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={12} lg={6}>
          <WeeklyLevelHomeworkItem complete={Boolean(item.recordUrl)}>
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
const WeeklyLevelReading = ({
  date,
  category,
  levelName,
}: WeeklyLevelHomeworkProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getReadingByLevelAndDate(levelName ?? "", date),
  });

  if (isLoading) return <WeeklyLevelHomeworkSkeleton />;
  return (
    <Grid container spacing={2}>
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
const WeeklyLevelWorkbook = ({
  date,
  category,
  levelName,
}: WeeklyLevelHomeworkProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getWorkbookByLevelAndDate(category, levelName ?? "", date),
  });

  if (isLoading) return <WeeklyLevelHomeworkSkeleton />;
  return (
    <Grid container spacing={2}>
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
