import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReadBooksDeleteDialogProps } from "./ReadBooksDeleteDialog.types";
import LoadingButton from "@mui/lab/LoadingButton";

function ReadBooksDeleteDialog({
  open,
  handleClose,
  handleDelete,
  isDeleting,
}: ReadBooksDeleteDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="confirm-delete-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="confirm-delete-dialog-title">
        Confirm Delete
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Click the "Confirm Delete" button to delete
        </Typography>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          autoFocus
          color="secondary"
          onClick={handleDelete}
          loading={isDeleting}
        >
          Confirm Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ReadBooksDeleteDialog;
