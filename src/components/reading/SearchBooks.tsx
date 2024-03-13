import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBooksProps } from "./SearchBooks.types";
import RecentSearchItems from "./SearchBooks.styles";
import { Link } from "react-router-dom";

function SearchBooks({ value, setValue, setSearchParams }: SearchBooksProps) {
  const recent = localStorage.getItem("recent-search");
  const [recentSearch, setRecentSearch] = useState<string[]>(
    JSON.parse(recent ?? "[]") as string[]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams({ query: value });

    // 중복 제거하기
    const setResult = new Set([value, ...recentSearch]);
    const result = Array.from(setResult);

    setRecentSearch(result);
    localStorage.setItem("recent-search", JSON.stringify(result));
  };

  const onClickDelete = () => {
    setRecentSearch([]);
    localStorage.setItem("recent-search", "[]");
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
      {recentSearch.length > 0 && (
        <Button size="small" onClick={onClickDelete}>
          최근 검색어 지우기
        </Button>
      )}
    </Box>
  );
}

export default SearchBooks;
