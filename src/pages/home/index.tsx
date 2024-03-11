import AppBar from "@/components/common/appbar";
import DailyCheckTitle from "@/components/home/DailyCheckTitle";
import DailyCheckItem from "@/components/home/DailyCheckItem";
import { WeeklyCheck } from "@/components/home/DailyCheckItem.types";
import SallyCheck from "@/components/home/SallyCheck";

const WEEK_DATA: WeeklyCheck = {
  mon: {
    record: true,
    workbook: true,
    checked: true,
  },
  tue: {
    record: true,
    reading: false,
    checked: true,
  },
  wed: {
    record: true,
    workbook: true,
    checked: true,
  },
  thu: {
    record: false,
    reading: true,
    checked: false,
  },
  fri: {
    record: true,
    checked: true,
  },
};

function Home() {
  return (
    <div>
      <AppBar title="Weekly Homework" disableBack />
      <DailyCheckTitle />
      <DailyCheckItem data={WEEK_DATA.mon} date="Mon." />
      <DailyCheckItem data={WEEK_DATA.tue} date="Tue." />
      <DailyCheckItem data={WEEK_DATA.wed} date="Wed." />
      <DailyCheckItem data={WEEK_DATA.thu} date="Thu." />
      <DailyCheckItem data={WEEK_DATA.fri} date="Fri." />
      <SallyCheck />
    </div>
  );
}

export default Home;
