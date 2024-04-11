import AppBar from "@/components/common/appbar";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
import DailyCheckItem from "@/components/home/DailyCheckItem";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyCheck } from "@/api/home";
import { useAppSelector } from "@/hooks/useReduxHook";
import { Box, CircularProgress } from "@mui/material";

function Home() {
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: () => getWeeklyCheck(uid),
  });

  if (!data)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "calc(100vh - 8rem)" }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <div>
      <AppBar title="Weekly Homework" disableBack />
      <DailyCheckTitle />
      <DailyCheckItem data={data.mon} date="Mon." />
      <DailyCheckItem data={data.tue} date="Tue." />
      <DailyCheckItem data={data.wed} date="Wed." />
      <DailyCheckItem data={data.thu} date="Thu." />
      <DailyCheckItem data={data.fri} date="Fri." />
    </div>
  );
}

export default Home;
