import { useQuery } from "@tanstack/react-query";
import { SearchBooksResultProps } from "./SearchBooksResult.types";
import { getBooks } from "@/api/search";
import AppBar from "../common/appbar";
import * as Styled from "./SearchBooksResult.styles";
import { Typography } from "@mui/material";

function SearchBooksResult({ query }: SearchBooksResultProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["books", "search", query],
    queryFn: () => getBooks(query),
  });

  if (isLoading || data === undefined) return null;
  return (
    <div>
      <AppBar title={query} />
      {data.items?.map((item) => (
        <Styled.BookSearchResultItem key={item.link} p={2}>
          <div className="img-area">
            <img src={item.image} />
          </div>
          <div className="text-area">
            <Styled.BookTitle variant="h6" fontWeight={700}>
              {item.title}
            </Styled.BookTitle>
            <Typography variant="body2" my={1}>
              {item.author}
            </Typography>
            <Typography variant="body2" my={1}>
              {item.publisher}
            </Typography>
            <Typography variant="body2">{item.pubdate}</Typography>
          </div>
        </Styled.BookSearchResultItem>
      ))}
    </div>
  );
}

export default SearchBooksResult;
