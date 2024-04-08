import Stack from "@mui/material/Stack";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { WeeklyStudentsItemProps } from "./WeeklyStudentsItem.types";
import * as Icons from "@/components/admin/dashboard/notification/index.styles";
import * as Styled from "./WeeklyStudentsItem.styles";

function WeeklyStudentsItem({ data }: WeeklyStudentsItemProps) {
  return (
    <Styled.WeeklyStudentsItemWrap>
      <Styled.WeeklyStudentsItemCell component="th">
        {data.name}
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.mon?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.mon?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.mon?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.tue?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.tue?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.tue?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.wed?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.wed?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.wed?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.thu?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.thu?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.thu?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.fri?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.fri?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.fri?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.sat?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.sat?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.sat?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
      <Styled.WeeklyStudentsItemCell component="td">
        <Stack direction="row" gap={0.5}>
          {data.sun?.record && (
            <Icons.RecordIconWrap>
              <MicIcon />
            </Icons.RecordIconWrap>
          )}
          {data.sun?.reading && (
            <Icons.ReadingIconWrap>
              <AutoStoriesIcon />
            </Icons.ReadingIconWrap>
          )}
          {data.sun?.workbook && (
            <Icons.WorkbookIconWrap>
              <StickyNote2Icon />
            </Icons.WorkbookIconWrap>
          )}
        </Stack>
      </Styled.WeeklyStudentsItemCell>
    </Styled.WeeklyStudentsItemWrap>
  );
}

export default WeeklyStudentsItem;
