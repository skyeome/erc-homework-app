import { Skeleton, Typography } from "@mui/material";
import * as Styled from "./SearchBooksResult.styles";

function SearchBooksSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((item) => (
        <Styled.BookSearchResultItem key={item} p={2}>
          <Skeleton variant="rectangular" width={70} height={110} />
          <div className="text-area">
            <Styled.BookTitle variant="h6" fontWeight={700}>
              <Skeleton variant="text" width={160} />
            </Styled.BookTitle>
            <Typography variant="body2" my={1}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Typography variant="body2" my={1}>
              <Skeleton variant="text" width={70} />
            </Typography>
            <Typography variant="body2">
              <Skeleton variant="text" width={70} />
            </Typography>
          </div>
        </Styled.BookSearchResultItem>
      ))}
    </div>
  );
}

export default SearchBooksSkeleton;
