import { Button } from "@mui/material";
import { RecordCompleteProps } from "./Recorder.types";
import RecordScreen from "./index.styles";

function RecordComplete({ chunks, setChunks }: RecordCompleteProps) {
  const blob = new Blob(chunks, { type: "audio/wav" });
  const downloadUrl = URL.createObjectURL(blob);

  const handleClickAgain = () => {
    setChunks([]);
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <RecordScreen px={4} pt={1}>
      <audio controls>
        <source src={downloadUrl} type="audio/wav" />
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
