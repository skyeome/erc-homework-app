import { db } from "@/libs/firebase";
import { format } from "date-fns";
import { collection, doc, setDoc } from "firebase/firestore";

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
  "type" | "uid" | "createdAt"
>;

export const uploadRecord = async ({
  type,
  uid,
  name,
  createdAt,
  recordRef,
  recordUrl,
}: RecordUploadData) => {
  const dataStr = format(createdAt, "yyyy-MM-dd");
  const docRef = doc(collection(db, type, uid, dataStr));
  await setDoc(docRef, {
    name,
    recordRef,
    recordUrl,
  });
};

export const uploadImageAndRecord = async (data: ImageAndRecordProps) => {
  const dataStr = format(data.createdAt, "yyyy-MM-dd");
  const docRef = doc(collection(db, data.type, data.uid, dataStr));

  const storeData: ImageAndRecordUploadData = { name: data.name };

  if (data.thumb) storeData.thumb = data.thumb;
  if (data.title) storeData.title = data.title;
  if (data.images) storeData.images = data.images;
  if (data.record) storeData.record = data.record;

  await setDoc(docRef, storeData);
};
