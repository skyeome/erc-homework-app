import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/useReduxHook";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WeeklyLevelHomework from "@/components/admin/homework/level/WeeklyLevelHomework";
import WeeklySetDateAndCategory from "@/components/admin/homework/level/WeeklySetDateAndCategory";
import { HomeworkTypes } from "@/components/admin/dashboard/notification/index.types";

function kebabToPascal(inputString?: string) {
  if (inputString === undefined) return "";
  // 문자열을 '-'를 기준으로 나눠 배열로 저장
  const parts = inputString.split("-");

  // 첫 번째 부분의 첫 글자를 대문자로 변경
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

  // 나머지 부분들을 순회하면서 각각의 첫 글자를 대문자로 변경
  for (let i = 1; i < parts.length; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }

  // 배열의 각 요소를 공백으로 이어 붙여 하나의 문자열로 만듦
  return parts.join(" ");
}

function AdminHomeworkLevel() {
  const { levelName } = useParams();
  const title = kebabToPascal(levelName);
  const [category, setCategory] = useState<HomeworkTypes>("record");
  const date = useAppSelector((state) => state.date.value);

  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        {title}
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
