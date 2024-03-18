import { Box, Button } from "@mui/material";
import { RecordCompleteProps } from "./Recorder.types";
import { uploadRecord } from "@/api/record";
import { useAppSelector } from "@/hooks/useReduxHook";
import { auth } from "@/libs/firebase";
import RecordScreen from "./index.styles";
import { format } from "date-fns";

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
    if (uid !== undefined)
      await uploadRecord({ uid, createdAt, fileRef: `${uid}/${date}-record` });
  };

  return (
    <RecordScreen px={4} pt={1}>
      <audio controls>
        <source
          src={downloadUrl}
          type={isSupport ? "audio/webm" : "audio/mp4"}
        />
      </audio>
      <a href={downloadUrl} download="녹음파일">
        다운로드
      </a>
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
