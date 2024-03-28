import { Box, Button } from "@mui/material";
import { useAppSelector } from "@/hooks/useReduxHook";
import useRecordUpload from "@/hooks/useRecordUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { RecordCompleteProps } from "./Recorder.types";
import RecordScreen from "./index.styles";
import LoadingButton from "@mui/lab/LoadingButton";

function RecordComplete({ chunks, setChunks }: RecordCompleteProps) {
  const createdAt = useAppSelector((state) => state.date.value);
  const {
    isSupport,
    isUploading,
    downloadUrl,
    handleClickAgain,
    handleSubmit,
  } = useRecordUpload({
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
        <LoadingButton
          variant="contained"
          size="large"
          fullWidth
          loading={isUploading}
          onClick={handleSubmit}
        >
          Submit homework
        </LoadingButton>
      </Box>
    </RecordScreen>
  );
}

export default RecordComplete;
