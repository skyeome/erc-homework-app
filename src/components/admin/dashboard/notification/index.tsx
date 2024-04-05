import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShadowBox from "@/components/common/box";
import { format } from "date-fns";
import NotiItem from "./notiItem";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { Noti } from "./index.types";
import * as Styled from "./index.styles";

const NOTIS: Noti[] = [
  {
    name: "김OO",
    type: "record",
    date: new Date("2024-04-01 12:34:56"),
  },
  {
    name: "박XX",
    type: "reading",
    date: new Date("2024-04-01 12:23:45"),
  },
  {
    name: "길OO",
    type: "workbook",
    date: new Date("2024-04-01 12:12:12"),
  },
  {
    name: "최XX",
    type: "reading",
    date: new Date("2024-03-31 23:23:45"),
  },
  {
    name: "유OO",
    type: "workbook",
    date: new Date("2024-03-31 23:12:12"),
  },
  {
    name: "김OO",
    type: "record",
    date: new Date("2024-03-31 22:34:56"),
  },
];

function AdminNotification() {
  return (
    <ShadowBox p={3} flex={1}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={700}>
          Notification
        </Typography>
        <Link to="">
          More
          <ChevronRightIcon sx={{ verticalAlign: "middle" }} />
        </Link>
      </Stack>
      {NOTIS.map((item) => (
        <NotiItem>
          <Stack direction="row" alignItems="center" gap={1}>
            {item.type === "record" ? (
              <Styled.RecordIconWrap>
                <MicIcon />
              </Styled.RecordIconWrap>
            ) : item.type === "reading" ? (
              <Styled.ReadingIconWrap>
                <AutoStoriesIcon />
              </Styled.ReadingIconWrap>
            ) : (
              <Styled.WorkbookIconWrap>
                <StickyNote2Icon />
              </Styled.WorkbookIconWrap>
            )}
            <Typography variant="body1">
              <strong>{item.name}</strong> has submitted his{" "}
              <strong>{item.type} homework.</strong>
            </Typography>
          </Stack>
          <Typography variant="body2">
            {format(item.date, "yyyy-MM-dd hh:mm:ss")}
          </Typography>
        </NotiItem>
      ))}
    </ShadowBox>
  );
}

export default AdminNotification;
