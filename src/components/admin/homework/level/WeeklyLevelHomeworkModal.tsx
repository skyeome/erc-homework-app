import { format } from "date-fns";
import {
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { WeeklyLevelHomeworkModalProps } from "./WeeklyLevelHomeworkModal.types";

function WeeklyLevelHomeworkModal({
  open,
  handleClose,
  modalData,
}: WeeklyLevelHomeworkModalProps) {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.up("sm"));
  const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: matched ? "90%" : "100%",
    maxWidth: 768,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: matched ? 4 : 0,
    p: 3,
    overflow: "scroll",
  };

  if (modalData === undefined)
    return (
      <Modal open={open} onClose={handleClose}>
        <Box />
      </Modal>
    );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="homework-modal-title"
      aria-describedby="homework-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={3}
        >
          <Stack
            direction="row"
            alignItems={matched ? "flex-start" : "center"}
            spacing={1.5}
          >
            {modalData.thumb && (
              <Box
                width={matched ? 42 : 60}
                sx={{
                  img: { maxWidth: "100%", verticalAlign: "top" },
                }}
              >
                <img src={modalData.thumb} />
              </Box>
            )}
            <Box>
              <Typography
                id="homework-modal-title"
                variant="h3"
                component="h2"
                fontWeight={700}
              >
                {modalData.title ?? "Untitled"}
              </Typography>
              <Typography
                id="homework-modal-description"
                variant="body2"
                color="GrayText"
                mt={1}
              >
                {modalData.date &&
                  format(modalData.date?.toDate(), "yyyy-MM-dd")}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {modalData.record && (
          <>
            <Typography variant="h4" component="h3" fontWeight={700}>
              Record
            </Typography>
            <Box my={2}>
              <audio controls>
                <source
                  src={modalData.record.recordUrl}
                  type={isSupport ? "audio/webm" : "audio/mp4"}
                />
              </audio>
            </Box>
          </>
        )}
        {modalData.images.length > 0 && (
          <>
            <Typography variant="h4" component="h3" fontWeight={700}>
              Uploaded Images
            </Typography>
            {modalData.images.map((src) => (
              <Box
                key={src.imageRef}
                mt={2}
                sx={{ img: { maxWidth: "100%", verticalAlign: "top" } }}
              >
                <img src={src.imageUrl} />
              </Box>
            ))}
          </>
        )}
      </Box>
    </Modal>
  );
}

export default WeeklyLevelHomeworkModal;
