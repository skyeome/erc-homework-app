import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { getWeekDate } from "@/hooks/getWeekDate";
import { WeeklyCheck } from "@/components/home/DailyCheckItem.types";
import { recordConverter } from "@/libs/firestore";

const setWeeklyByDay = (day: number, result: WeeklyCheck, target: string) => {
  switch (day) {
    case 1:
      result.mon[target] = true;
      break;
    case 2:
      result.tue[target] = true;
      break;
    case 3:
      result.wed[target] = true;
      break;
    case 4:
      result.thu[target] = true;
      break;
    case 5:
      result.fri[target] = true;
      break;
  }
};

export const getWeeklyCheck = async (uid: string | null) => {
  if (!uid) throw new Error("로그인 해주세요");
  // 결과값 저장하는 변수
  const result: WeeklyCheck = {
    mon: { checked: false },
    tue: { checked: false },
    wed: { checked: false },
    thu: { checked: false },
    fri: { checked: false },
  };
  // 이번주 월~토(금요일 12시)를 생성
  const [startDate, endDate] = getWeekDate();

  // 이번주 숙제 검사
  const recordRef = collection(db, "record");
  const readingRef = collection(db, "reading");
  const workRef = collection(db, "workbook");
  const wheres = [
    where("uid", "==", uid),
    where("date", ">", startDate),
    where("date", "<", endDate),
  ];
  const q1 = query(recordRef, ...wheres).withConverter(recordConverter);
  const q2 = query(readingRef, ...wheres);
  const q3 = query(workRef, ...wheres);
  const recordSnap = await getDocs(q1);
  const readingSnap = await getDocs(q2);
  const workSnap = await getDocs(q3);
  recordSnap.forEach((doc) => {
    const date = doc.data().date.toDate();
    const day = date.getDay();
    setWeeklyByDay(day, result, "record");
  });
  readingSnap.forEach((doc) => {
    const date = doc.data().date.toDate();
    const day = date.getDay();
    setWeeklyByDay(day, result, "reading");
  });
  workSnap.forEach((doc) => {
    const date = doc.data().date.toDate();
    const day = date.getDay();
    setWeeklyByDay(day, result, "workbook");
  });

  return result;
};
