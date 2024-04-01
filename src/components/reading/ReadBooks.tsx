import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "@/api/reading";
import { useAppSelector } from "@/hooks/useReduxHook";
import { Reading } from "@/libs/firestore";
import ReadBooksNone from "./ReadBooksNone";
import * as Styled from "./ReadBooks.styles";

function ReadBooks() {
  const { uid } = useAppSelector((state) => state.user);
  const { data, isFetched } = useQuery({
    queryKey: ["reading", "list"],
    queryFn: () => getReadingBooks(uid),
  });

  const uniqueBooks: Reading[] | undefined = data?.filter(
    (obj, index, self) => index === self.findIndex((t) => t.title === obj.title)
  );

  if (isFetched && data?.length === 0) return <ReadBooksNone />;
  return (
    <Styled.ReadBooksList>
      {uniqueBooks?.map((book) => (
        <Styled.ReadBooksItem key={book.id}>
          <Link to={book.title} state={book}>
            <div className="thumb-wrap">
              <img
                src={book.thumb || book.images[0].imageUrl}
                alt={book.title}
              />
            </div>
          </Link>
        </Styled.ReadBooksItem>
      ))}
    </Styled.ReadBooksList>
  );
}

export default ReadBooks;
