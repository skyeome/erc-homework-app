import { db } from "@/libs/firebase";
import { format } from "date-fns";
import { collection, doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

interface RecordUploadData {
  type: string;
  uid: string;
  createdAt: Date;
  fileRef: string;
  fileUrl: string;
}

export const uploadRecord = async ({
  type,
  uid,
  createdAt,
  fileRef,
  fileUrl,
}: RecordUploadData) => {
  const dataStr = format(createdAt, "yyyy-MM-dd");
  const docRef = doc(collection(db, type, uid, dataStr));
  await setDoc(docRef, {
    fileRef,
    fileUrl,
    createdAt,
  });
  toast.success("숙제 제출이 완료되었습니다.");
};
