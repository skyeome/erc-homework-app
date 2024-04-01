import AppBar from "@/components/common/appbar";
import ReadBooksDetailItem from "@/components/reading/detail/ReadBooksDetailItem";
import { Box, Button, Grid } from "@mui/material";
import ReadBooksDeleteDialog from "@/components/reading/detail/ReadBooksDeleteDialog";
import useReadingDelete from "@/hooks/useReadingDelete";
import * as Styled from "@/components/reading/search/SearchBooksResult.styles";

function BookReadingDetail() {
  const {
    data,
    book,
    deleteItems,
    setDeleteItems,
    isDeleting,
    open,
    handleOpen,
    handleClose,
    handleDelete,
  } = useReadingDelete();

  return (
    <div>
      <AppBar title="Delete Reading Homework" />
      <Styled.BookSearchResultItem p={2}>
        <div className="img-area">
          <img src={book.thumb || book.images[0].imageUrl} />
        </div>
        <div className="text-area">
          <Styled.BookTitle variant="h4" fontWeight={700}>
            {book.title}
          </Styled.BookTitle>
        </div>
      </Styled.BookSearchResultItem>
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
      <Grid container spacing={2} p={2}>
        {data?.map((book) => (
          <ReadBooksDetailItem
            key={book.id}
            book={book}
            deleteItems={deleteItems}
            setDeleteItems={setDeleteItems}
          />
        ))}
      </Grid>
      <ReadBooksDeleteDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default BookReadingDetail;
