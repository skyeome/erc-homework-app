import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { format } from "date-fns";
import { auth, storage } from "@/libs/firebase";
import type { chunks, setChunks } from "@/components/record/Recorder.types";
import { uploadRecord } from "@/api/record";

interface RecordUploadData {
  type: string;
  chunks: chunks;
  setChunks: setChunks;
  date?: Date;
}

function useRecordUpload({ type, chunks, setChunks, date }: RecordUploadData) {
  let recordUrl: string | undefined;
  const uid = auth.currentUser?.uid;
  const dateStr = format(date === undefined ? new Date() : date, "yyyy-MM-dd");

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
    if (uid !== undefined && chunks.length > 0) {
      recordRef = `${uid}/${dateStr}-record.${isSupport ? "weba" : "mp4"}`;
      const fileRef = ref(storage, recordRef);
      await uploadBytes(fileRef, blob);
      recordUrl = await getDownloadURL(fileRef);
      handleClickAgain();
    }

    return {
      recordRef,
      recordUrl,
    };
  };

  const handleSubmit = async () => {
    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (uid !== undefined && chunks.length > 0) {
      const recordRef = `${uid}/${dateStr}-record.${
        isSupport ? "weba" : "mp4"
      }`;
      const fileRef = ref(storage, recordRef);
      try {
        // 파일 업로드 및 다운로드 url 생성
        await uploadBytes(fileRef, blob);
        recordUrl = await getDownloadURL(fileRef);
        // db에 url과 파일이름 저장
        await uploadRecord({
          type,
          uid,
          createdAt: date === undefined ? new Date() : date,
          recordRef,
          recordUrl,
        });
        handleClickAgain();
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code, error.message);
        }
      }
    }
  };
  return {
    isSupport,
    downloadUrl,
    handleClickAgain,
    handleSubmit,
    handleRecordUpload,
  };
}

export default useRecordUpload;
