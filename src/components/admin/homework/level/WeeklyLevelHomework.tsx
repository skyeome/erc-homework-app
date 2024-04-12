import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import LoadingButton from "@mui/lab/LoadingButton";
import DownloadIcon from "@mui/icons-material/Download";
import { WeeklyLevelHomeworkProps } from "./WeeklyLevelHomework.types";
import {
  ReadingHomeworkData,
  RecordHomeworkData,
  WorkbookHomeworkData,
  deleteImageAndRecord,
  deleteRecord,
  getReadingByLevelAndDate,
  getRecordByLevelAndDate,
  getWorkbookByLevelAndDate,
  updateCheckState,
} from "@/api/admin";
import WeeklyLevelHomeworkItem from "./WeeklyLevelHomeworkItem";

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getRecordByLevelAndDate(levelName ?? "", date),
  });

  const onClickCheck = async (checkId: string) => {
    try {
      await updateCheckState(category, checkId);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

  const onClickDelete = async (deleteObj: RecordHomeworkData) => {
    try {
      if (deleteObj.recordRef !== undefined)
        await deleteRecord(deleteObj.id, deleteObj.recordRef);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

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
                {item.recordUrl !== undefined && (
                  <a href={item.recordUrl} download>
                    <DownloadIcon sx={{ verticalAlign: "middle" }} />
                  </a>
                )}
                {item.check ? (
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    onClick={() => onClickDelete(item)}
                    loading={isLoading}
                  >
                    Delete
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    variant="contained"
                    onClick={() => onClickCheck(item.id)}
                    loading={isLoading}
                    disabled={item.recordUrl === undefined}
                  >
                    Check
                  </LoadingButton>
                )}
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getReadingByLevelAndDate(levelName ?? "", date),
  });

  const onClickCheck = async (checkId: string) => {
    try {
      await updateCheckState(category, checkId);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

  const onClickDelete = async (deleteObj: ReadingHomeworkData) => {
    const delImages = deleteObj.images?.map((el) => el.imageRef);
    const delRecord = deleteObj.record?.recordRef;
    try {
      await deleteImageAndRecord(category, deleteObj.id, delImages, delRecord);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

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
              {item.check ? (
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  onClick={() => onClickDelete(item)}
                  loading={isLoading}
                >
                  Delete
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  onClick={() => onClickCheck(item.id)}
                  loading={isLoading}
                >
                  Check
                </LoadingButton>
              )}
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "admin",
      "homework",
      levelName,
      category,
      format(date, "yyyy-MM-dd"),
    ],
    queryFn: () => getWorkbookByLevelAndDate(category, levelName ?? "", date),
  });

  const onClickCheck = async (checkId: string) => {
    try {
      await updateCheckState(category, checkId);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

  const onClickDelete = async (deleteObj: WorkbookHomeworkData) => {
    const delImages = deleteObj.images?.map((el) => el.imageRef);
    const delRecord = deleteObj.record?.recordRef;
    console.log(delImages);
    console.log(delRecord);
    try {
      await deleteImageAndRecord(category, deleteObj.id, delImages, delRecord);
    } catch (error) {
      if (error instanceof FirebaseError)
        toast.error(`code: ${error.code}, message: ${error.message}`);
    } finally {
      refetch();
    }
  };

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
              {item.check ? (
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  onClick={() => onClickDelete(item)}
                  loading={isLoading}
                >
                  Delete
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  onClick={() => onClickCheck(item.id)}
                  loading={isLoading}
                >
                  Check
                </LoadingButton>
              )}
            </Stack>
            <WeeklyLevelHomeworkItem.Workbook data={item} />
          </WeeklyLevelHomeworkItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklyLevelHomework;
