import { getWeekDate } from "@/hooks/getWeekDate";
import { db } from "@/libs/firebase";
import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

interface RecordUploadData {
  type: string;
  uid: string;
  name: string;
  createdAt: Date;
  recordRef: string;
  recordUrl: string;
}

interface ImageUpload {
  imageRef: string;
  imageUrl: string;
}

interface RecordUpload {
  recordRef?: string;
  recordUrl?: string;
}

export interface ImageAndRecordProps {
  type: string;
  uid: string;
  name: string;
  createdAt: Date;
  title?: string;
  thumb?: string;
  images?: ImageUpload[];
  record?: RecordUpload;
}

type ImageAndRecordUploadData = Omit<
  ImageAndRecordProps,
  "type" | "createdAt"
> & {
  date: Date;
};

export const uploadRecord = async ({
  type,
  uid,
  name,
  createdAt,
  recordRef,
  recordUrl,
}: RecordUploadData) => {
  const date = new Date(createdAt);
  // const date = format(createdAt, "yyyy-MM-dd");

  await addDoc(collection(db, type), {
    uid,
    name,
    date,
    recordRef,
    recordUrl,
  });
};

export const uploadImageAndRecord = async (data: ImageAndRecordProps) => {
  const date = new Date(data.createdAt);
  // const date = format(data.createdAt, "yyyy-MM-dd");

  const storeData: ImageAndRecordUploadData = {
    uid: data.uid,
    name: data.name,
    date,
  };

  if (data.thumb) storeData.thumb = data.thumb;
  if (data.title) storeData.title = data.title;
  if (data.images) storeData.images = data.images;
  if (data.record) storeData.record = data.record;
  storeData.date = date;

  await addDoc(collection(db, data.type), storeData);
};

export const getThisWeekRecord = async (uid: string | null) => {
  const [startDate, endDate] = getWeekDate();
  if (!uid) throw new Error("로그인 해주세요");

  const docRef = collection(db, "record");
  const q1 = query(
    docRef,
    where("uid", "==", uid),
    where("date", ">", startDate),
    where("date", "<", endDate)
  );
  const querySnap = await getDocs(q1);

  const results: DocumentData[] = [];
  querySnap.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
};
