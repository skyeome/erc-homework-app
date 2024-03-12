import axios from "axios";
import BOOK_SEARCH_URL from "./baseUrl";

export const bookSearch = axios.create({
  baseURL: BOOK_SEARCH_URL,
  headers: {
    "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
  },
});

export const getBook = async (query: string) => {
  const { data } = await bookSearch.get(`book.json?query=${query}`);
  return data;
};
