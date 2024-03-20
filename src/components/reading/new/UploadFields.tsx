import { FormEvent } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import useImageUpload from "@/hooks/useImageUpload";
import useRecordUpload from "@/hooks/useRecordUpload";
import UploadBar from "./UploadBar";
import { UploadFieldsProps } from "./UploadFields.types";
import RecordScreen from "@/components/record/index.styles";
import * as Styled from "./UploadFields.styles";

function UploadFields({ type, title, image }: UploadFieldsProps) {
  const {
    input,
    images,
    chunks,
    setChunks,
    handleUpload,
    handleChange,
    handleReset,
    handleSubmit: handleImageSubmit,
  } = useImageUpload(type, image);
  const {
    isSupport,
    downloadUrl,
    handleSubmit: handleRecordSubmit,
  } = useRecordUpload({ type, chunks, setChunks });
  const handleSubmit = async (e: FormEvent) => {
    await handleImageSubmit(e);
    await handleRecordSubmit();
  };

  return (
    <Styled.UploadFieldForm onSubmit={handleSubmit}>
      <Box pt={1} px={2}>
        {image && (
          <Box mb={2} sx={{ "& img": { maxWidth: "100%" } }}>
            <img src={image} />
          </Box>
        )}
        <TextField label="title" defaultValue={title} fullWidth />
        {images === undefined ? (
          <Box mt={2} p={2} textAlign="center">
            <CollectionsBookmarkOutlinedIcon fontSize="large" />
            <Typography variant="body1" mt={1}>
              <AddPhotoAlternateOutlinedIcon
                fontSize="small"
                sx={{ verticalAlign: "sub" }}
              />
              사진 아이콘이나
              <MicNoneOutlinedIcon
                fontSize="small"
                sx={{ verticalAlign: "sub" }}
              />
              녹음 아이콘을 눌러 <br />
              숙제를 올려 주세요.
            </Typography>
          </Box>
        ) : (
          <Box mt={2} sx={{ "& img": { maxWidth: "100%" } }}>
            {images.map((src, i) => (
              <img key={i} src={src} />
            ))}
          </Box>
        )}
      </Box>
      {chunks.length > 0 && (
        <RecordScreen px={4} pt={1}>
          <audio controls>
            <source
              src={downloadUrl}
              type={isSupport ? "audio/webm" : "audio/mp4"}
            />
          </audio>
        </RecordScreen>
      )}
      <UploadBar
        ref={input}
        isActive={Boolean(!images)}
        setChunks={setChunks}
        handleUpload={handleUpload}
        handleChange={handleChange}
        handleReset={handleReset}
      />
    </Styled.UploadFieldForm>
  );
}

export default UploadFields;
