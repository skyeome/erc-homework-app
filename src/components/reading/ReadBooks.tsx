import { useQuery } from "@tanstack/react-query";
import { getReadingBooks } from "@/api/reading";
import { useAppSelector } from "@/hooks/useReduxHook";
import { Reading } from "@/libs/firestore";
import * as Styled from "./ReadBooks.styles";

function ReadBooks() {
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["reading", "list"],
    queryFn: () => getReadingBooks(uid),
  });

  const uniqueBooks: Reading[] | undefined = data?.filter(
    (obj, index, self) => index === self.findIndex((t) => t.title === obj.title)
  );

  return (
    <Styled.ReadBooksList>
      {uniqueBooks?.map((book) => (
        <Styled.ReadBooksItem key={book.id}>
          <img src={book.thumb || book.images[0].imageUrl} alt={book.title} />
        </Styled.ReadBooksItem>
      ))}
    </Styled.ReadBooksList>
  );
}

export default ReadBooks;
