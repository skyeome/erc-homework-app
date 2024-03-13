import { useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import UploadBar from "./UploadBar";
import * as Styled from "./UploadFields.styles";

function UploadFields() {
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>();

  // handle Click
  const handleInputClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (imageUploadRef.current) imageUploadRef.current.click();
  };

  // handle file change
  const handleEditProfile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드한 파일들이 있을 때
    if (e.target.files) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImageUrls((prev) => {
        if (!prev) return urls;
        return [...prev, ...urls];
      });
    }
    // 파일 초기화!
    if (imageUploadRef.current) imageUploadRef.current.value = "";
  };

  return (
    <Styled.UploadFieldForm>
      <Box pt={1} px={2}>
        <TextField label="title" fullWidth />
        {imageUrls === undefined ? (
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
            {imageUrls.map((src, i) => (
              <img key={i} src={src} />
            ))}
          </Box>
        )}
      </Box>
      <UploadBar
        ref={imageUploadRef}
        handleUpload={handleInputClick}
        handleChange={handleEditProfile}
      />
    </Styled.UploadFieldForm>
  );
}

export default UploadFields;
