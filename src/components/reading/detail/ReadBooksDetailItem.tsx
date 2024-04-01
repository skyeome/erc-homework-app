import { format } from "date-fns";
import { Box, Checkbox, Typography } from "@mui/material";
import { ReadBooksDetailItemProps } from "./ReadBooksDetailItem.types";
import ReadBooksDetailItemWrap from "./ReadBooksDetailItem.styles";

function ReadBooksDetailItem({
  book,
  deleteItems,
  setDeleteItems,
}: ReadBooksDetailItemProps) {
  const onChangeValue = (id: string) => {
    setDeleteItems((prev) => {
      // 이미 삭제 목록에 있으면 삭제
      if (prev.indexOf(id) !== -1)
        return prev.filter((element) => element !== id);
      // 삭제 목록에 없으면 추가
      return [...prev, id];
    });
  };

  return (
    <ReadBooksDetailItemWrap item xs={6}>
      <Checkbox
        size="large"
        checked={deleteItems.includes(book.id)}
        onChange={() => {
          onChangeValue(book.id);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
      <div className="thumb-wrap">
        <img src={book.images[0].imageUrl} alt={book.title} />
      </div>
      <Box className="text-area">
        <Typography variant="body2" color="GrayText" my={1}>
          {format(book.date.toDate(), "yyyy-MM-dd HH:mm:ss")}
        </Typography>
      </Box>
    </ReadBooksDetailItemWrap>
  );
}

export default ReadBooksDetailItem;
