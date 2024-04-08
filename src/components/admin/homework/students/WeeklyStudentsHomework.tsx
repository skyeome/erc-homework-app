import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { generateAllWeekDates } from "@/hooks/getWeekDate";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeeklyStudentsItem from "./WeeklyStudentsItem";
import { StudentsHomework } from "./WeeklyStudentsHomework.types";
import * as Styled from "./WeeklyStudentsItem.styles";

const WeeklyStudentsData: StudentsHomework[] = [
  {
    uid: "erc1234",
    name: "김OO",
    mon: {
      record: true,
      workbook: true,
    },
    tue: {
      record: true,
      reading: true,
    },
    wed: {
      record: true,
      workbook: true,
    },
    thu: {
      record: true,
      reading: true,
    },
    fri: {
      record: true,
    },
  },
  {
    uid: "erc2345",
    name: "이XX",
    mon: {
      record: true,
      workbook: true,
    },
    tue: {
      record: true,
    },
    wed: {
      record: true,
      workbook: true,
    },
    thu: {
      record: true,
      reading: true,
    },
    fri: {
      record: true,
    },
  },
  {
    uid: "erc3456",
    name: "박OO",
    mon: {
      record: true,
    },
    tue: {
      record: true,
      reading: true,
    },
    wed: {
      record: true,
    },
    thu: {
      record: true,
      reading: true,
    },
    fri: {
      record: true,
    },
  },
  {
    uid: "erc4567",
    name: "최XX",
    mon: {
      record: true,
      workbook: true,
    },
    tue: {
      record: true,
      reading: true,
    },
    wed: {
      record: true,
      workbook: true,
    },
    thu: {
      record: true,
      reading: true,
    },
  },
  {
    uid: "erc5678",
    name: "정OO",
    mon: {
      record: true,
      workbook: true,
    },
    tue: {
      reading: true,
    },
    wed: {
      record: true,
      workbook: true,
    },
    thu: {
      record: true,
    },
    fri: {
      record: true,
    },
  },
];

function WeeklyStudentsHomework() {
  const weeks = generateAllWeekDates();
  return (
    <Box
      component="table"
      sx={{ display: "block", width: { xs: 768, md: "100%" } }}
    >
      <Box component="thead" display="block" pt={1}>
        <Styled.WeeklyStudentsItemWrap>
          <Styled.WeeklyStudentsItemCell component="th" />
          {weeks.map((day) => (
            <Styled.WeeklyStudentsItemCell
              key={format(day, "EEE")}
              component="th"
            >
              <Typography component="span" variant="body1" fontWeight={700}>
                {format(day, "MM/dd(EEE)", { locale: ko })}
              </Typography>
            </Styled.WeeklyStudentsItemCell>
          ))}
        </Styled.WeeklyStudentsItemWrap>
      </Box>
      <Box component="tbody" display="block">
        {WeeklyStudentsData.map((data) => (
          <WeeklyStudentsItem key={data.uid} data={data} />
        ))}
      </Box>
    </Box>
  );
}

export default WeeklyStudentsHomework;
