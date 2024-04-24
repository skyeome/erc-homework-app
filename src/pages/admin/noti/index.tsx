import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { getAllNotification } from "@/api/admin";
import ShadowBox from "@/components/common/box";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NotiItem from "@/components/admin/dashboard/notification/notiItem";
import * as Styled from "@/components/admin/dashboard/notification/index.styles";
import { CircularProgress } from "@mui/material";

function AdminNotis() {
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["admin", "notifications", "all"],
    queryFn: getAllNotification,
    initialPageParam: monthAgo,
    getNextPageParam: (lastPage) =>
      lastPage.length < 10
        ? null
        : lastPage[lastPage.length - 1].timestamp.toDate(),
    retry: 1,
  });

  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Notifications
      </Typography>
      <ShadowBox p={3}>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((item) => (
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
                  {format(item.date.toDate(), "yyyy-MM-dd aa hh:mm:ss", {
                    locale: ko,
                  })}
                </Typography>
              </NotiItem>
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
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
      </ShadowBox>
    </div>
  );
}

export default AdminNotis;
