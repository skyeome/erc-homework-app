import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import useUpload from "@/hooks/useUpload";
import UploadBar from "./UploadBar";
import { UploadFieldsProps } from "./UploadFields.types";
import RecordScreen from "@/components/record/index.styles";
import * as Styled from "./UploadFields.styles";

function UploadFields({ type, title, image }: UploadFieldsProps) {
  const [isActive, setIsActive] = useState(true);
  const [titleTxt, setTitleTxt] = useState(title);
  const {
    isUploading,
    input,
    images,
    chunks,
    setChunks,
    handleUpload,
    handleChange,
    handleReset,
    handleSubmit,
    isSupport,
    downloadUrl,
  } = useUpload(type, image, titleTxt);

  useEffect(() => {
    console.log();
    if (images === undefined && chunks.length === 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [images, chunks]);

  return (
    <Styled.UploadFieldForm onSubmit={handleSubmit}>
      <Box pt={1} px={2}>
        {image && (
          <Box mb={2} sx={{ "& img": { maxWidth: "100%" } }}>
            <img src={image} />
          </Box>
        )}
        <TextField
          label="title"
          value={titleTxt}
          onChange={(e) => setTitleTxt(e.target.value)}
          fullWidth
        />
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
        isUploading={isUploading}
        isActive={isActive}
        chunks={chunks}
        setChunks={setChunks}
        handleUpload={handleUpload}
        handleChange={handleChange}
        handleReset={handleReset}
      />
    </Styled.UploadFieldForm>
  );
}

export default UploadFields;
