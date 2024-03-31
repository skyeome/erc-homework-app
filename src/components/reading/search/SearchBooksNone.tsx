import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBooksNoneProps } from "./SearchBooksNone.types";

function SearchBooksNone({ query }: SearchBooksNoneProps) {
  return (
    <Box p={2}>
      <Typography textAlign="center" py={2}>
        <SearchIcon fontSize="large" />
      </Typography>
      <Typography variant="h3">
        No search results for <strong>"{query}"</strong>
      </Typography>
      <ul>
        <li>Make sure the words are spelled correctly.</li>
        <li>Make sure you type in English or English in Korean.</li>
        <li>
          Reduce the number of words in a search term, or search again with a
          more general search term.
        </li>
      </ul>
    </Box>
  );
}

export default SearchBooksNone;
