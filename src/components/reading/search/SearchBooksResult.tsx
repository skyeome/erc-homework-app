import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "@/api/search";
import { Typography } from "@mui/material";
import AppBar from "../../common/appbar";
import { SearchBooksResultProps } from "./SearchBooksResult.types";
import * as Styled from "./SearchBooksResult.styles";

function SearchBooksResult({ query }: SearchBooksResultProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["books", "search", query],
    queryFn: () => getBooks(query),
    retry: 1,
  });

  const handleClickAddBook = (title: string, image: string) => {
    navigate("/reading/new", { state: { title, image, type: "reading" } });
  };

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
          <Styled.AddNewBookBtn
            onClick={() => handleClickAddBook(item.title, item.image)}
          >
            + add
          </Styled.AddNewBookBtn>
        </Styled.BookSearchResultItem>
      ))}
    </div>
  );
}

export default SearchBooksResult;
