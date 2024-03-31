import AppBar from "@/components/common/appbar";
import ReadBooksDetailItem from "@/components/reading/detail/ReadBooksDetailItem";
import { Box, Button } from "@mui/material";
import ReadBooksDeleteDialog from "@/components/reading/detail/ReadBooksDeleteDialog";
import useReadingDelete from "@/hooks/useReadingDelete";

function BookReadingDetail() {
  const {
    title,
    data,
    deleteItems,
    setDeleteItems,
    open,
    handleOpen,
    handleClose,
    handleDelete,
  } = useReadingDelete();

  return (
    <div>
      <AppBar title={title} />
      <Box display="flex" justifyContent="flex-end" px={2} py={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpen}
          disabled={deleteItems.length === 0}
        >
          Delete
        </Button>
      </Box>
      {data?.map((book) => (
        <ReadBooksDetailItem
          key={book.id}
          book={book}
          deleteItems={deleteItems}
          setDeleteItems={setDeleteItems}
        />
      ))}
      <ReadBooksDeleteDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default BookReadingDetail;
