import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAppDispatch } from "./useReduxHook";
import { setUser } from "@/libs/userSlice";

export default function useAuthChange() {
  const { currentUser } = auth;
  const dispatch = useAppDispatch();
  if (currentUser) {
    const userCopy = {
      uid: currentUser.uid,
    };
    dispatch(setUser(userCopy));
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (currentUser == null && user !== null) {
        const userCopy = {
          uid: user.uid,
        };
        dispatch(setUser(userCopy));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch]);
}
