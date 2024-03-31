import { useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "@/api/search";
import { Box, Typography } from "@mui/material";
import AppBar from "../../common/appbar";
import { SearchBooksResultProps } from "./SearchBooksResult.types";
import * as Styled from "./SearchBooksResult.styles";
import SearchBooksSkeleton from "./SearchBooksSkeleton";
import SearchBooksNone from "./SearchBooksNone";

function SearchBooksResult({ query }: SearchBooksResultProps) {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam }) => {
      const data = await getBooks(query, pageParam);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.total >= lastPage.start
        ? lastPage.start + 10
        : undefined,
  });

  const handleClickAddBook = (title: string, image: string) => {
    navigate("/reading/new", { state: { title, image, type: "reading" } });
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading || data === undefined)
    return (
      <div>
        <AppBar title={query} />
        <SearchBooksSkeleton />
      </div>
    );
  return (
    <div>
      <AppBar title={query} />
      {data.pages.map((page) => (
        <Fragment key={page?.start}>
          {page?.total === 0 && <SearchBooksNone query={query} />}
          {page?.items?.map((item) => (
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
        </Fragment>
      ))}
      <Box ref={ref} pt={4} />
    </div>
  );
}

export default SearchBooksResult;
