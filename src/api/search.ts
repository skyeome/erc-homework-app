import axios from "axios";

export interface SearchResult {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: BookItem[];
}

export interface BookItem {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
}

export const bookSearch = axios.create({
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "X-Naver-Client-Id": import.meta.env.DEV
      ? import.meta.env.VITE_NAVER_CLIENT_ID
      : import.meta.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": import.meta.env.DEV
      ? import.meta.env.VITE_NAVER_CLIENT_SECRET
      : import.meta.env.NAVER_CLIENT_SECRET,
  },
});

export const getBooks = async (query?: string) => {
  if (query === undefined || query === "") return;
  const { data } = await bookSearch.get<SearchResult>(`/api/book.json`, {
    params: { query },
  });
  return data;
};
