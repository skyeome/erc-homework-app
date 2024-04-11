import { Fragment } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WeeklyStudentsItem from "./WeeklyStudentsItem";
import useWeeklyStudentsHomework from "./WeeklyStudentsHomework.hooks";
import * as Styled from "./WeeklyStudentsItem.styles";

function WeeklyStudentsHomework() {
  const { weeks, data, isLoading, fetchNextPage } = useWeeklyStudentsHomework();

  if (isLoading) return <div>loading...</div>;
  return (
    <>
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
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.map((el) => (
                <WeeklyStudentsItem key={el.uid} data={el} />
              ))}
            </Fragment>
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          onClick={() => {
            fetchNextPage();
          }}
        >
          Load more
        </Button>
      </Box>
    </>
  );
}

export default WeeklyStudentsHomework;
