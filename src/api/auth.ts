import { db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface CurrentUser {
  uid: string;
  name: string;
}

export const getCurrentUser = async (
  uid?: string
): Promise<CurrentUser | undefined> => {
  if (uid === undefined) return;
  const userSnap = await getDoc(doc(db, "user", uid));
  if (userSnap.exists()) {
    const data = { uid, name: userSnap.data().name };
    return data;
  }
};
