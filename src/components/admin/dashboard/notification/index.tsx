import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/api/admin";
import { format } from "date-fns";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShadowBox from "@/components/common/box";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NotiItem from "./notiItem";
import * as Styled from "./index.styles";

function AdminNotification() {
  const { data } = useQuery({
    queryKey: ["admin", "notifications"],
    queryFn: getNotifications,
  });

  return (
    <ShadowBox p={3} flex={1}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={700}>
          Notification
        </Typography>
        <Link to="/admin/notis">
          More
          <ChevronRightIcon sx={{ verticalAlign: "middle" }} />
        </Link>
      </Stack>
      {data?.map((item) => (
        <NotiItem key={item.id}>
          <Link
            to={`/admin/homework/${item.level}?category=${
              item.type
            }&date=${format(item.date.toDate(), "yyyy-MM-dd")}`}
          >
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
          </Link>
          <Typography variant="body2">
            {format(item.date.toDate(), "yyyy-MM-dd hh:mm:ss")}
          </Typography>
        </NotiItem>
      ))}
    </ShadowBox>
  );
}

export default AdminNotification;
