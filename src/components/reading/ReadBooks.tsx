import * as Styled from "./ReadBooks.styles";

interface BookInfo {
  id: string;
  title: string;
  image: string;
}

const BOOKS: BookInfo[] = [
  {
    id: "1",
    title: "천사와 악마 1",
    image:
      "https://shopping-phinf.pstatic.net/main_3250468/32504684404.20230815082206.jpg",
  },
  {
    id: "2",
    title: "천사와 악마 2",
    image:
      "https://shopping-phinf.pstatic.net/main_3249250/32492508318.20230815081954.jpg",
  },
  {
    id: "3",
    title:
      "천사와 악마가 말하는 세상을 발칵 뒤집은 전쟁 (천사와 악마가 말하는)",
    image:
      "https://shopping-phinf.pstatic.net/main_3244176/32441768540.20221227204347.jpg",
  },
  {
    id: "4",
    title: "천사와 악마 (HQ-850)",
    image:
      "https://shopping-phinf.pstatic.net/main_3250661/32506616686.20220527064852.jpg",
  },
  {
    id: "5",
    title: "천사와 악마",
    image:
      "https://shopping-phinf.pstatic.net/main_3247850/32478501076.20220520110454.jpg",
  },
  {
    id: "6",
    title:
      "천사와 악마 절대 도감 (세계를 지키는 자들과 파괴하는 자들! 100명 이상 대공개!)",
    image:
      "https://shopping-phinf.pstatic.net/main_3249656/32496569226.20221019142844.jpg",
  },
];

function ReadBooks() {
  return (
    <Styled.ReadBooksList>
      {BOOKS.map((book) => (
        <Styled.ReadBooksItem key={book.id}>
          <img src={book.image} alt={book.title} />
        </Styled.ReadBooksItem>
      ))}
    </Styled.ReadBooksList>
  );
}

export default ReadBooks;
