import { Box, TextField, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import UploadBar from "./UploadBar";
import useImageUpload from "@/hooks/useImageUpload";
import { UploadFieldsProps } from "./UploadFields.types";
import * as Styled from "./UploadFields.styles";

function UploadFields({ onlyPicture }: UploadFieldsProps) {
  const { input, images, handleUpload, handleChange } = useImageUpload();

  return (
    <Styled.UploadFieldForm>
      <Box pt={1} px={2}>
        <TextField label="title" fullWidth />
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
      <UploadBar
        ref={input}
        handleUpload={handleUpload}
        handleChange={handleChange}
        onlyPicture={onlyPicture}
      />
    </Styled.UploadFieldForm>
  );
}

export default UploadFields;
