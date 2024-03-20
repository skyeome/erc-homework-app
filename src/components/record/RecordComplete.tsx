import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useAppSelector } from "@/hooks/useReduxHook";
import { auth, storage } from "@/libs/firebase";
import { uploadRecord } from "@/api/record";
import { RecordCompleteProps } from "./Recorder.types";
import RecordScreen from "./index.styles";

function RecordComplete({ chunks, setChunks }: RecordCompleteProps) {
  const createdAt = useAppSelector((state) => state.date.value);
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
    const date = format(createdAt, "yyyy-MM-dd");

    if (uid !== undefined) {
      const recordFileName = `${uid}/${date}-record.${
        isSupport ? "weba" : "mp4"
      }`;
      const recordRef = ref(storage, recordFileName);
      try {
        // 파일 업로드 및 다운로드 url 생성
        await uploadBytes(recordRef, blob);
        const fileUrl = await getDownloadURL(recordRef);
        // db에 url과 파일이름 저장
        await uploadRecord({
          uid,
          createdAt,
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

  return (
    <RecordScreen px={4} pt={1}>
      <audio controls>
        <source
          src={downloadUrl}
          type={isSupport ? "audio/webm" : "audio/mp4"}
        />
      </audio>
      <div className="text-center">
        <a href={downloadUrl} download="녹음파일" className="download-link">
          <FileDownloadIcon />
          DOWNLOAD RECORD
        </a>
      </div>
      <Box mt={3}>
        <Button size="large" fullWidth onClick={handleClickAgain}>
          Record again
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Submit homework
        </Button>
      </Box>
    </RecordScreen>
  );
}

export default RecordComplete;
