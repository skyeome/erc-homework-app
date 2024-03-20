/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAppDispatch, useAppSelector } from "./useReduxHook";
import { setUser } from "@/libs/userSlice";

export default function useAuthChange() {
  const { currentUser } = auth;
  const uid = useAppSelector((state) => state.user.uid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null && uid === null) {
      navigate("/auth/login");
    }
  }, [currentUser, uid]);

  useEffect(() => {
    if (currentUser) {
      const userCopy = {
        uid: currentUser.uid,
      };
      dispatch(setUser(userCopy));
    }
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
  }, [currentUser]);
}
