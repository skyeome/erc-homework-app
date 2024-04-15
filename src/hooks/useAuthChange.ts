/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAppDispatch, useAppSelector } from "./useReduxHook";
import { setUser } from "@/libs/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/auth";

export default function useAuthChange() {
  const { currentUser } = auth;
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(isTeacher, currentUser?.uid),
  });
  const uid = useAppSelector((state) => state.user.uid);
  const isTeacher = useAppSelector((state) => state.user.teacher);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null && uid === null) {
      navigate("/auth/login");
    }
  }, [currentUser, uid]);

  useEffect(() => {
    if (currentUser && data) {
      dispatch(setUser(data));
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (currentUser == null && user !== null && data) {
        dispatch(setUser(data));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser, data]);
}
