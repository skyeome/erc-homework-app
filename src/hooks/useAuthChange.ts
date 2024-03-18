import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAppDispatch } from "./useReduxHook";
import { clearUser, setUser } from "@/libs/userSlice";

export default function useAuthChange() {
  const { currentUser } = auth;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUser) {
      const userCopy = {
        uid: currentUser.uid,
      };
      dispatch(setUser(userCopy));
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const userCopy = {
          uid: user.uid,
        };
        dispatch(setUser(userCopy));
      } else {
        dispatch(clearUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch]);
}
