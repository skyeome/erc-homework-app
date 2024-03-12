import { FormEvent } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBooksProps } from "./SearchBooks.types";
import RecentSearchItems from "./SearchBooks.styles";
import { Link } from "react-router-dom";

function SearchBooks({ value, setValue, setSearchParams }: SearchBooksProps) {
  const recent = localStorage.getItem("recent-search");
  const recentSearch = JSON.parse(recent ?? "[]");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ query: value });

    // 중복 제거하기
    recentSearch.unshift(value);
    const setResult = new Set(recentSearch);
    const result = Array.from(setResult);

    localStorage.setItem("recent-search", JSON.stringify(result));
  };
  return (
    <Box px={2}>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setValue("")}
              >
                <CancelRoundedIcon />
              </IconButton>
            ),
          }}
        />
      </form>
      <RecentSearchItems>
        {recentSearch.map((item: string) => (
          <li key={item}>
            <Link to={`/reading/search?query=${item}`}>{item}</Link>
          </li>
        ))}
      </RecentSearchItems>
    </Box>
  );
}

export default SearchBooks;
