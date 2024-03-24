import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { AddUserType } from "../admin/user/AddUserForm.types";

const useLoginForm = () => {
  const navigate = useNavigate();
  const [keepLogin, setKeepLogin] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddUserType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onClickSwitch = () => {
    setKeepLogin((prev) => !prev);
  };

  const onSubmit = handleSubmit(async (data: AddUserType) => {
    const salt = process.env.SOME_CODE;
    const newUsername = data.username + "@email.com";
    const newPassword = `${data.password}${salt}`;

    // 로그인 작업
    try {
      if (!keepLogin) await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, newUsername, newPassword);
      navigate("/");
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  });

  return {
    control,
    errors,
    keepLogin,
    onClickSwitch,
    onSubmit,
  };
};

export default useLoginForm;
