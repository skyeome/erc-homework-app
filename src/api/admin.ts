import { StudentsHomework } from "@/components/admin/homework/students/WeeklyStudentsHomework.types";
import { getWeekDateAll } from "@/hooks/getWeekDate";
import { db } from "@/libs/firebase";
import {
  Student,
  levelConverter,
  readingConverter,
  recordConverter,
  studentConverter,
  workbookConverter,
} from "@/libs/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

interface HomeworkCommons {
  id: string;
  uid: string;
  name: string;
  level: string;
  check?: boolean;
}

export interface RecordHomeworkData extends HomeworkCommons {
  recordRef?: string;
  recordUrl?: string;
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
  // 검색 범위 : 시작 하는 날
  const startDate = date;
  startDate.setHours(0, 0, 0, 0);
  // 검색 범위 : 끝나는 날
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  // 데이터 저장
  const data: RecordHomeworkData[] = [];

  const recordQuery = query(
    collection(db, "record"),
    where("level", "==", level),
    where("date", ">", startDate),
    where("date", "<", endDate)
  ).withConverter(recordConverter);
  const userQuery = query(
    collection(db, "user"),
    where("level", "==", level)
  ).withConverter(studentConverter);

  const recordSn = await getDocs(recordQuery);
  const userSn = await getDocs(userQuery);

  recordSn.forEach((snap) => {
    const temp = snap.data();
    data.push(temp);
  });

  userSn.forEach((snap) => {
    const temp = snap.data();
    const matches = data.findIndex((record) => record.uid === temp.id);
    if (matches < 0) {
      data.push({
        id: temp.id,
        uid: temp.username,
        level: temp.level,
        name: temp.name,
      });
    }
  });

  return data;
};
// 클래스별 특정날짜 Reading 데이터 불러오기
export const getReadingByLevelAndDate = async (level: string, date: Date) => {
  // 검색 범위 : 시작 하는 날
  const startDate = date;
  startDate.setHours(0, 0, 0, 0);
  // 검색 범위 : 끝나는 날
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  // 데이터 저장
  const data: ReadingHomeworkData[] = [];

  const readingQuery = query(
    collection(db, "reading"),
    where("level", "==", level),
    where("date", ">", startDate),
    where("date", "<", endDate)
  ).withConverter(readingConverter);
  const readingSn = await getDocs(readingQuery);
  readingSn.forEach((snap) => {
    const temp = snap.data();
    data.push(temp);
  });

  return data;
};
// 클래스별 특정날짜 Workbook 데이터 불러오기
export const getWorkbookByLevelAndDate = async (
  category: string,
  level: string,
  date: Date
) => {
  // 검색 범위 : 시작 하는 날
  const startDate = date;
  startDate.setHours(0, 0, 0, 0);
  // 검색 범위 : 끝나는 날
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);
  // 데이터 저장
  const data: WorkbookHomeworkData[] = [];

  const workbookQuery = query(
    collection(db, category),
    where("level", "==", level),
    where("date", ">", startDate),
    where("date", "<", endDate)
  ).withConverter(workbookConverter);
  const workbookSn = await getDocs(workbookQuery);
  workbookSn.forEach((snap) => {
    const temp = snap.data();
    data.push(temp);
  });
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

// 레벨 목록 불러오기
export const getLevels = async () => {
  let options: string[] = [];
  const levelRef = doc(db, "levels", "list").withConverter(levelConverter);
  const docSnap = await getDoc(levelRef);

  if (docSnap.exists()) {
    options = [...docSnap.data().options];
  }
  return options;
};

// update check state
export const updateCheckState = async (category: string, checkId: string) => {
  await updateDoc(doc(db, category, checkId), {
    check: true,
  });
};
