import { Box, Button } from "@mui/material";
import { useAppSelector } from "@/hooks/useReduxHook";
import useRecordUpload from "@/hooks/useRecordUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { RecordCompleteProps } from "./Recorder.types";
import RecordScreen from "./index.styles";

function RecordComplete({ chunks, setChunks }: RecordCompleteProps) {
  const createdAt = useAppSelector((state) => state.date.value);
  const { isSupport, downloadUrl, handleClickAgain, handleSubmit } =
    useRecordUpload({
      type: "record",
      chunks,
      setChunks,
      date: createdAt,
    });

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
