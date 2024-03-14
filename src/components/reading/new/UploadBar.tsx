import React from "react";
import { Box, Button, IconButton, Modal } from "@mui/material";
import useModal from "@/hooks/useModal";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import Recorder from "@/components/record/Recorder";
import { UploadBarProps } from "./UploadBar.types";
import * as Styled from "./UploadBar.styles";

const UploadBar = React.forwardRef<HTMLInputElement, UploadBarProps>(
  ({ isActive, handleUpload, handleChange, handleReset, onlyPicture }, ref) => {
    const { open, handleOpen, handleClose } = useModal();

    return (
      <div>
        <Styled.UploadBarFixed>
          <Styled.UploadHidden
            ref={ref}
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          <Styled.UploadBarFixedInner>
            <Styled.UploadBarBox p={2} direction="column" gap={1}>
              <Button
                type="reset"
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleReset}
              >
                Upload again
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isActive}
              >
                Submit homework
              </Button>
            </Styled.UploadBarBox>
            <Styled.UploadBtns direction="row" p={1}>
              <IconButton onClick={handleUpload}>
                <AddPhotoAlternateOutlinedIcon fontSize="large" />
              </IconButton>
              {!onlyPicture && (
                <IconButton onClick={handleOpen}>
                  <MicNoneOutlinedIcon fontSize="large" />
                </IconButton>
              )}
            </Styled.UploadBtns>
          </Styled.UploadBarFixedInner>
        </Styled.UploadBarFixed>
        <Modal open={open} onClose={handleClose}>
          <Styled.RecorderModal>
            <Styled.RecorderModalContent pb={4}>
              <Box p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Recorder setChunks={() => {}} />
            </Styled.RecorderModalContent>
          </Styled.RecorderModal>
        </Modal>
      </div>
    );
  }
);

export default UploadBar;
