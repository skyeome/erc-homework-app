import { StudentsHomework } from "@/components/admin/homework/students/WeeklyStudentsHomework.types";
import { getWeekDateAll } from "@/hooks/getWeekDate";
import { db } from "@/libs/firebase";
import { Student, recordConverter, studentConverter } from "@/libs/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

interface HomeworkCommons {
  id: string;
  uid: string;
  name: string;
  date: Date;
  level: string;
}

export interface RecordHomeworkData extends HomeworkCommons {
  recordRef: string;
  recordUrl: string;
}
export interface ReadingHomeworkData extends HomeworkCommons {
  title: string;
  thumb: string;
  images: { imageRef: string; imageUrl: string }[];
  record: { recordRef: string; recordUrl: string };
}
export interface WorkbookHomeworkData extends HomeworkCommons {
  title: string;
  images: { imageRef: string; imageUrl: string }[];
  record: { recordRef: string; recordUrl: string };
}

// 클래스별 특정날짜 Record 데이터 불러오기
export const getRecordByLevelAndDate = async (level: string, date: Date) => {
  // 추후 제거 필요
  console.log(date);
  const data = [
    {
      id: "erc1234",
      uid: "1234",
      name: "김성겸",
      recordRef: "",
      recordUrl: "",
      date: new Date("2024-04-01 12:00:00"),
      level,
    },
  ];
  return data;
};
// 클래스별 특정날짜 Reading 데이터 불러오기
export const getReadingByLevelAndDate = async (level: string, date: Date) => {
  // 추후 제거 필요
  console.log(date);
  const data = [
    {
      id: "erc1234",
      uid: "1234",
      name: "김성겸",
      title: "책 제목 1",
      thumb: "",
      images: [{ imageRef: "", imageUrl: "" }],
      record: { recordRef: "", recordUrl: "" },
      date: new Date("2024-04-01 12:00:00"),
      level,
    },
  ];
  return data;
};
// 클래스별 특정날짜 Workbook 데이터 불러오기
export const getWorkbookByLevelAndDate = async (level: string, date: Date) => {
  // 추후 제거 필요
  console.log(date);
  const data = [
    {
      id: "erc1234",
      uid: "1234",
      name: "김성겸",
      title: "설명글",
      images: [{ imageRef: "", imageUrl: "" }],
      record: { recordRef: "", recordUrl: "" },
      date: new Date("2024-04-01 12:00:00"),
      level,
    },
  ];
  return data;
};

export const getAllUsers = async () => {
  const data: Student[] = [];
  const q = query(collection(db, "user")).withConverter(studentConverter);
  const querySn = await getDocs(q);
  querySn.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

// const WeeklyStudentsData: StudentsHomework[] = [
//   {
//     uid: "erc1234",
//     name: "김OO",
//     mon: {
//       record: true,
//       workbook: true,
//     },
//     tue: {
//       record: true,
//       reading: true,
//     },
//     wed: {
//       record: true,
//       workbook: true,
//     },
//     thu: {
//       record: true,
//       reading: true,
//     },
//     fri: {
//       record: true,
//     },
//   },
//   {
//     uid: "erc2345",
//     name: "이XX",
//     mon: {
//       record: true,
//       workbook: true,
//     },
//     tue: {
//       record: true,
//     },
//     wed: {
//       record: true,
//       workbook: true,
//     },
//     thu: {
//       record: true,
//       reading: true,
//     },
//     fri: {
//       record: true,
//     },
//   },
//   {
//     uid: "erc3456",
//     name: "박OO",
//     mon: {
//       record: true,
//     },
//     tue: {
//       record: true,
//       reading: true,
//     },
//     wed: {
//       record: true,
//     },
//     thu: {
//       record: true,
//       reading: true,
//     },
//     fri: {
//       record: true,
//     },
//   },
//   {
//     uid: "erc4567",
//     name: "최XX",
//     mon: {
//       record: true,
//       workbook: true,
//     },
//     tue: {
//       record: true,
//       reading: true,
//     },
//     wed: {
//       record: true,
//       workbook: true,
//     },
//     thu: {
//       record: true,
//       reading: true,
//     },
//   },
//   {
//     uid: "erc5678",
//     name: "정OO",
//     mon: {
//       record: true,
//       workbook: true,
//     },
//     tue: {
//       reading: true,
//     },
//     wed: {
//       record: true,
//       workbook: true,
//     },
//     thu: {
//       record: true,
//     },
//     fri: {
//       record: true,
//     },
//   },
// ];

const setWeeklyHomeworkState = (
  day: number,
  result: StudentsHomework,
  target: string,
  value: boolean
) => {
  switch (day) {
    case 0:
      if (result.sun !== undefined) result.sun[target] = value;
      break;
    case 1:
      if (result.mon !== undefined) result.mon[target] = value;
      break;
    case 2:
      if (result.tue !== undefined) result.tue[target] = value;
      break;
    case 3:
      if (result.wed !== undefined) result.wed[target] = value;
      break;
    case 4:
      if (result.thu !== undefined) result.thu[target] = value;
      break;
    case 5:
      if (result.fri !== undefined) result.fri[target] = value;
      break;
    case 6:
      if (result.sat !== undefined) result.sat[target] = value;
      break;
  }
};

export const getAllUsersHomework = async ({
  pageParam,
}: {
  pageParam: string;
}) => {
  const data: StudentsHomework[] = [];
  const [startDate, endDate] = getWeekDateAll();
  const students: Student[] = [];
  const q = query(
    collection(db, "user"),
    orderBy("username"),
    startAfter(pageParam),
    limit(5)
  ).withConverter(studentConverter);
  const querySn = await getDocs(q);
  querySn.forEach((doc) => {
    students.push(doc.data());
  });
  const recordRef = collection(db, "record");
  const readingRef = collection(db, "reading");
  const workRef = collection(db, "workbook");
  const wheres = [
    where(
      "uid",
      "in",
      students.map((el) => el.id)
    ),
    where("date", ">", startDate),
    where("date", "<", endDate),
  ];
  const q1 = query(recordRef, ...wheres).withConverter(recordConverter);
  const q2 = query(readingRef, ...wheres);
  const q3 = query(workRef, ...wheres);
  const promises = [getDocs(q1), getDocs(q2), getDocs(q3)];
  const results = await Promise.all(promises);
  querySn.forEach((doc) => {
    const userData = doc.data();
    const temp: StudentsHomework = {
      uid: userData.username,
      name: userData.name,
      mon: {},
      tue: {},
      wed: {},
      thu: {},
      fri: {},
      sat: {},
      sun: {},
    };
    results[0].forEach((doc) => {
      const date = doc.data().date.toDate();
      const day = date.getDay();
      if (doc.data().uid === userData.id)
        setWeeklyHomeworkState(day, temp, "record", true);
    });
    results[1].forEach((doc) => {
      const date = doc.data().date.toDate();
      const day = date.getDay();
      if (doc.data().uid === userData.id)
        setWeeklyHomeworkState(day, temp, "reading", true);
    });
    results[2].forEach((doc) => {
      const date = doc.data().date.toDate();
      const day = date.getDay();
      if (doc.data().uid === userData.id)
        setWeeklyHomeworkState(day, temp, "workbook", true);
    });
    data.push(temp);
  });

  return data;
};
