import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WeeklyLevelHomework from "@/components/admin/homework/level/WeeklyLevelHomework";
import WeeklySetDateAndCategory from "@/components/admin/homework/level/WeeklySetDateAndCategory";
import { HomeworkTypes } from "@/components/admin/dashboard/notification/index.types";
import { setDate } from "@/libs/dateSlice";

function AdminHomeworkLevel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { levelName } = useParams();
  const [category, setCategory] = useState<HomeworkTypes>("record");
  const date = useAppSelector((state) => state.date.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const categoryParam = searchParams.get("category") as HomeworkTypes;
    const dateParam = searchParams.get("date");

    if (dateParam) dispatch(setDate({ value: new Date(dateParam) }));
    if (categoryParam) setCategory(categoryParam);
  }, [dispatch, searchParams]);

  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        {levelName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <WeeklySetDateAndCategory
            date={date}
            category={category}
            setCategory={setCategory}
            setSearchParams={setSearchParams}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <WeeklyLevelHomework
            date={date}
            category={category}
            levelName={levelName}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminHomeworkLevel;
