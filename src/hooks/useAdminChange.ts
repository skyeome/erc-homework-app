/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAppDispatch, useAppSelector } from "./useReduxHook";
import { setUser } from "@/libs/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getAdminState } from "@/api/auth";
import { clearTeacher, setTeacher } from "@/libs/adminSlice";

export default function useAdminChange() {
  const { currentUser } = auth;
  const { data } = useQuery({
    queryKey: ["admin", "user"],
    queryFn: () => getAdminState(currentUser?.uid),
  });
  const uid = useAppSelector((state) => state.user.uid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null && uid === null) {
      navigate("/auth/login");
    }
    if (currentUser !== null && data?.teacher === false) {
      navigate("/");
    }
  }, [currentUser, uid, data]);

  useEffect(() => {
    if (currentUser && data) {
      dispatch(setUser(data));
      dispatch(setTeacher());
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (currentUser == null && user !== null && data) {
        dispatch(setUser(data));
        dispatch(clearTeacher());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [currentUser, data]);
}
