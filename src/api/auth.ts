import { db } from "@/libs/firebase";
import { teacherConverter } from "@/libs/firestore";
import { UserState } from "@/libs/userSlice";
import { doc, getDoc } from "firebase/firestore";

export const getCurrentUser = async (
  isTeacher: boolean,
  uid?: string
): Promise<UserState | undefined> => {
  if (!uid) throw new Error("로그인 해주세요");
  if (isTeacher) {
    const userSnap = await getDoc(
      doc(db, "teacher", uid).withConverter(teacherConverter)
    );
    if (userSnap.exists()) {
      const data = {
        uid,
        name: userSnap.data().name,
        level: userSnap.data().level,
        teacher: true,
      };
      return data;
    } else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  } else {
    const userSnap = await getDoc(doc(db, "user", uid));
    if (userSnap.exists()) {
      const data = {
        uid,
        name: userSnap.data().name,
        level: userSnap.data().level,
        teacher: false,
      };
      return data;
    } else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  }
};
