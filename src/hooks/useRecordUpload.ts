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
  let fileUrl: string | undefined;
  const user = auth.currentUser;

  const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
  const blob = new Blob(chunks, {
    type: isSupport ? "audio/webm" : "audio/mp4",
  });
  const downloadUrl = URL.createObjectURL(blob);

  const handleClickAgain = () => {
    setChunks([]);
    URL.revokeObjectURL(downloadUrl);
  };

  const handleSubmit = async () => {
    const uid = user?.uid;
    const dateStr = format(
      date === undefined ? new Date() : date,
      "yyyy-MM-dd"
    );

    // 사용자가 로그인 되어있고 파일이 있으면 업로드
    if (uid !== undefined && chunks.length > 0) {
      const recordFileName = `${uid}/${dateStr}-record.${
        isSupport ? "weba" : "mp4"
      }`;
      const recordRef = ref(storage, recordFileName);
      try {
        // 파일 업로드 및 다운로드 url 생성
        await uploadBytes(recordRef, blob);
        fileUrl = await getDownloadURL(recordRef);
        // db에 url과 파일이름 저장
        await uploadRecord({
          type,
          uid,
          createdAt: date === undefined ? new Date() : date,
          fileRef: recordFileName,
          fileUrl,
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
  };
}

export default useRecordUpload;
