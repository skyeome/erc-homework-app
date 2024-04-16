import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import { getThisWeekRecord, uploadRecord } from "@/api/record";
import type { chunks, setChunks } from "@/components/record/Recorder.types";
import { useAppSelector } from "./useReduxHook";
import { setNotification } from "@/api/admin";

interface RecordUploadData {
  type: string;
  chunks: chunks;
  setChunks: setChunks;
  date?: Date;
}

function useRecordUpload({ type, chunks, setChunks, date }: RecordUploadData) {
  let recordUrl: string | undefined;
  const user = useAppSelector((state) => state.user);
  const [isUploading, setIsUploading] = useState(false);
  const { refetch } = useQuery({
    queryKey: ["record", "weekly"],
    queryFn: () => getThisWeekRecord(user.uid),
  });
  const selectedDate = date === undefined ? new Date() : date;
  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const timeStr = format(selectedDate, "HH:mm:ss");

  const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
  const blob = new Blob(chunks, {
    type: isSupport ? "audio/webm" : "audio/mp4",
  });
  const downloadUrl = URL.createObjectURL(blob);

  const handleClickAgain = () => {
    setChunks([]);
    URL.revokeObjectURL(downloadUrl);
  };

  const handleRecordUpload = async () => {
    let recordRef: string | undefined;

    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (user.uid !== null && user.name !== null && chunks.length > 0) {
      recordRef = `${type}/${user.uid}/${dateStr}/${
        user.name + "_" + timeStr
      }-record.${isSupport ? "weba" : "mp4"}`;
      const fileRef = ref(storage, recordRef);
      await uploadBytes(fileRef, blob);
      recordUrl = await getDownloadURL(fileRef);
      handleClickAgain();

      return {
        recordRef,
        recordUrl,
      };
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (
      user.uid !== null &&
      user.name !== null &&
      user.level !== null &&
      chunks.length > 0
    ) {
      const recordRef = `${type}/${user.uid}/${dateStr}/${
        user.name + "_" + timeStr
      }-record.${isSupport ? "weba" : "mp4"}`;
      const fileRef = ref(storage, recordRef);
      try {
        // 파일 업로드 및 다운로드 url 생성
        await uploadBytes(fileRef, blob);
        recordUrl = await getDownloadURL(fileRef);
        // db에 url과 파일이름 저장
        const id = await uploadRecord({
          type,
          uid: user.uid,
          name: user.name,
          level: user.level,
          createdAt: date === undefined ? new Date() : date,
          recordRef,
          recordUrl,
        });
        // 알림에 기록 저장
        await setNotification(id, type, user.name, user.level, date);
        toast.success("숙제 제출이 완료되었습니다.");
        handleClickAgain();
        refetch();
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code, error.message);
        }
        toast.error("숙제 제출중에 문제가 발생했습니다.");
      } finally {
        setIsUploading(false);
      }
    }
  };
  return {
    isSupport,
    isUploading,
    downloadUrl,
    handleClickAgain,
    handleSubmit,
    handleRecordUpload,
  };
}

export default useRecordUpload;
