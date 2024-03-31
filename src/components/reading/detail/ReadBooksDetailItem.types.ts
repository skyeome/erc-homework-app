import { Reading } from "@/libs/firestore";

export interface ReadBooksDetailItemProps {
  book: Reading;
  deleteItems: string[];
  setDeleteItems: React.Dispatch<React.SetStateAction<string[]>>;
}
