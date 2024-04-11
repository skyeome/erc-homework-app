import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useReduxHook";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WeeklyLevelHomework from "@/components/admin/homework/level/WeeklyLevelHomework";
import WeeklySetDateAndCategory from "@/components/admin/homework/level/WeeklySetDateAndCategory";
import { HomeworkTypes } from "@/components/admin/dashboard/notification/index.types";

function AdminHomeworkLevel() {
  const { levelName } = useParams();
  const [category, setCategory] = useState<HomeworkTypes>("record");
  const date = useAppSelector((state) => state.date.value);

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
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <WeeklyLevelHomework date={date} category={category} />
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminHomeworkLevel;
