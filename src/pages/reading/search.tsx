import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppBar from "@/components/common/appbar";
import SearchBooks from "@/components/reading/search/SearchBooks";
import SearchBooksResult from "@/components/reading/search/SearchBooksResult";

function BookSearch() {
  // input 값 저장
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  if (query === null)
    return (
      <div>
        <AppBar title="Book Search" />
        <SearchBooks
          value={searchQuery}
          setValue={setSearchQuery}
          setSearchParams={setSearchParams}
        />
      </div>
    );
  return <SearchBooksResult query={query} />;
}

export default BookSearch;
