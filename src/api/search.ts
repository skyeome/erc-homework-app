import axios from "axios";
import BOOK_SEARCH_URL from "./baseUrl";

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
  baseURL: BOOK_SEARCH_URL,
});

export const getBooks = async (query?: string) => {
  if (query === undefined || query === "") return;
  const { data } = await bookSearch.get<SearchResult>(`myCORS`, {
    params: { query },
  });
  return data;
};
