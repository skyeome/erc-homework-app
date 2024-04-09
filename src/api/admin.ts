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
