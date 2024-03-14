import { Button } from "@mui/material";
import { RecordCompleteProps } from "./Recorder.types";
import RecordScreen from "./index.styles";

function RecordComplete({ chunks, setChunks }: RecordCompleteProps) {
  const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
  const blob = new Blob(chunks, {
    type: isSupport ? "audio/webm" : "audio/mp4",
  });
  const downloadUrl = URL.createObjectURL(blob);

  const handleClickAgain = () => {
    setChunks([]);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <RecordScreen px={4} pt={1}>
      <audio controls>
        <source
          src={downloadUrl}
          type={isSupport ? "audio/webm" : "audio/mp4"}
        />
      </audio>
      <div>
        <Button onClick={handleClickAgain} size="large" fullWidth>
          Record again
        </Button>
        <Button variant="contained" size="large" fullWidth>
          Submit homework
        </Button>
      </div>
    </RecordScreen>
  );
}

export default RecordComplete;
