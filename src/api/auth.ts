import { db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface CurrentUser {
  uid: string;
  name: string;
  level: string;
}

export const getCurrentUser = async (
  uid?: string
): Promise<CurrentUser | undefined> => {
  if (!uid) throw new Error("로그인 해주세요");
  const userSnap = await getDoc(doc(db, "user", uid));
  if (userSnap.exists()) {
    const data = {
      uid,
      name: userSnap.data().name,
      level: userSnap.data().level,
    };
    return data;
  } else {
    throw new Error("존재하지 않는 회원입니다.");
  }
};
