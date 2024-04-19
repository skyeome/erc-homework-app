import { useState } from "react";
import { format } from "date-fns";
import useModal from "@/hooks/useModal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { WeeklyLevelHomeworkProps } from "./WeeklyLevelHomework.types";
import { ReadingHomeworkData } from "@/api/admin";
import WeeklyLevelHomeworkModal from "./WeeklyLevelHomeworkModal";
import WeeklyLevelHomework from "./WeeklyLevelHomework";

function WeeklyLevelAllHomework({
  date,
  category,
  levelName,
}: WeeklyLevelHomeworkProps) {
  const { open, handleOpen, handleClose } = useModal();
  const [modalData, setModalData] = useState<ReadingHomeworkData>();

  return (
    <Paper sx={{ minHeight: 470 }}>
      <Typography variant="h3" fontWeight={700} p={3}>
        {category + " / " + format(date, "yyyy-MM-dd")}
      </Typography>
      <Divider />
      {/* 클래스별 숙제 컴포넌트 */}
      <Box p={3}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Record
        </Typography>
        <WeeklyLevelHomework.Record
          date={date}
          category="record"
          levelName={levelName}
        />
        <Typography variant="h4" fontWeight={700} mt={4} mb={2}>
          Reading
        </Typography>
        <WeeklyLevelHomework.Reading
          date={date}
          category="reading"
          levelName={levelName}
          handleOpen={handleOpen}
          setModalData={setModalData}
        />
        <Typography variant="h4" fontWeight={700} mt={4} mb={2}>
          Workbook
        </Typography>
        <WeeklyLevelHomework.Workbook
          date={date}
          category="workbook"
          levelName={levelName}
          handleOpen={handleOpen}
          setModalData={setModalData}
        />
        <Typography variant="h4" fontWeight={700} mt={4} mb={2}>
          Other
        </Typography>
        <WeeklyLevelHomework.Workbook
          date={date}
          category="other"
          levelName={levelName}
          handleOpen={handleOpen}
          setModalData={setModalData}
        />
      </Box>
      <WeeklyLevelHomeworkModal
        open={open}
        handleClose={handleClose}
        modalData={modalData}
      />
    </Paper>
  );
}

export default WeeklyLevelAllHomework;
