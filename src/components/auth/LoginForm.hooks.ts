import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { LoginFormType } from "./LoginForm.types";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
  const navigate = useNavigate();
  const [keepLogin, setKeepLogin] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onClickSwitch = () => {
    setKeepLogin((prev) => !prev);
  };

  const onSubmit = handleSubmit(async (data: LoginFormType) => {
    const salt = import.meta.env.DEV
      ? import.meta.env.VITE_SOME_CODE
      : process.env.SOME_CODE;
    const newUsername = data.username + "@email.com";
    const newPassword = `${data.password}${salt}`;

    // 로그인 작업
    try {
      if (!keepLogin) await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        newUsername,
        newPassword
      );
      console.log(userCredential.user);
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
