import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { format } from "date-fns";
import { getAllNotification } from "@/api/admin";
import ShadowBox from "@/components/common/box";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MicIcon from "@mui/icons-material/Mic";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import NotiItem from "@/components/admin/dashboard/notification/notiItem";
import * as Styled from "@/components/admin/dashboard/notification/index.styles";
import { CircularProgress } from "@mui/material";

function AdminNotis() {
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["admin", "notifications", "all"],
    queryFn: getAllNotification,
    initialPageParam: new Date("2000-01-01"),
    getNextPageParam: (lastPage) =>
      lastPage.length < 5
        ? null
        : lastPage[lastPage.length - 1].timestamp.toDate(),
    retry: 1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
                  {format(item.date.toDate(), "yyyy-MM-dd hh:mm:ss")}
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
      </ShadowBox>
      <Box ref={ref} height={100} />
    </div>
  );
}

export default AdminNotis;
