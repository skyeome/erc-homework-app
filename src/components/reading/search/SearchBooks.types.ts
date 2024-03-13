import { SetURLSearchParams } from "react-router-dom";

export interface SearchBooksProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: SetURLSearchParams;
}
