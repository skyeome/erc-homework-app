import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Box, Typography } from "@mui/material";

function ReadBooksNone() {
  return (
    <Box py={4}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
        제출한 숙제가 없습니다.
      </Typography>
      <Typography textAlign="center">
        <BookmarkAddIcon sx={{ verticalAlign: "middle" }} /> 버튼을 눌러 숙제를
        제출해주세요
      </Typography>
    </Box>
  );
}

export default ReadBooksNone;
