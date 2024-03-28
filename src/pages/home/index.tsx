import AppBar from "@/components/common/appbar";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
import DailyCheckItem from "@/components/home/DailyCheckItem";
import SallyCheck from "@/components/home/SallyCheck";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyCheck } from "@/api/home";
import { useAppSelector } from "@/hooks/useReduxHook";

function Home() {
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["home"],
    queryFn: () => getWeeklyCheck(uid),
  });

  if (data === undefined) return <div>loading...</div>;
  return (
    <div>
      <AppBar title="Weekly Homework" disableBack />
      <DailyCheckTitle />
      <DailyCheckItem data={data.mon} date="Mon." />
      <DailyCheckItem data={data.tue} date="Tue." />
      <DailyCheckItem data={data.wed} date="Wed." />
      <DailyCheckItem data={data.thu} date="Thu." />
      <DailyCheckItem data={data.fri} date="Fri." />
      <SallyCheck />
    </div>
  );
}

export default Home;
