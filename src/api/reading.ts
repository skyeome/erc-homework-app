import { db } from "@/libs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Reading, readingConverter } from "@/libs/firestore";

export const getReadingBooks = async (uid: string | null) => {
  if (!uid) throw new Error("로그인 해주세요");
  const result: Reading[] = [];
  const q = query(
    collection(db, "reading"),
    where("uid", "==", uid)
  ).withConverter(readingConverter);
  const docSnap = await getDocs(q);

  docSnap.forEach((book) => {
    const data = book.data();
    result.push(data);
  });
  if (result.length > 0) return result;
};
