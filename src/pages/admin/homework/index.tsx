import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import WeeklyStudentsHomework from "@/components/admin/homework/students/WeeklyStudentsHomework";
import * as Styled from "@/components/admin/dashboard/notification/index.styles";

function AdminHomework() {
  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        gap={2}
        p={2}
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Homeworks by Students
        </Typography>
        <Stack direction="row" gap={2}>
          <Stack direction="row" gap={1}>
            <Styled.RecordIconWrap>
              <MicIcon />
            </Styled.RecordIconWrap>
            <Typography>record</Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Styled.ReadingIconWrap>
              <AutoStoriesIcon />
            </Styled.ReadingIconWrap>
            <Typography>reading</Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Styled.WorkbookIconWrap>
              <StickyNote2Icon />
            </Styled.WorkbookIconWrap>
            <Typography>workbook</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Paper sx={{ width: "100%", overflowX: "scroll" }}>
        <WeeklyStudentsHomework />
      </Paper>
    </div>
  );
}

export default AdminHomework;
