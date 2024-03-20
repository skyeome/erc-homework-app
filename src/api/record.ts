import { db } from "@/libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

interface RecordUploadData {
  uid: string;
  createdAt: Date;
  fileRef: string;
  fileUrl: string;
}

export const uploadRecord = async (data: RecordUploadData) => {
  await setDoc(doc(db, "record", data.uid), {
    fileRef: data.fileRef,
    fileUrl: data.fileUrl,
    createdAt: data.createdAt,
  });
  toast.success("숙제 제출이 완료되었습니다.");
};
