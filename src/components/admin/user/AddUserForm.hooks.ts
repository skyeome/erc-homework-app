import { useForm } from "react-hook-form";
import { auth, db } from "@/libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { AddUserType } from "./AddUserForm.types";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// const validateEmail = (email: string): boolean => {
//   // 이메일 형식을 확인하는 정규식
//   const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailRegex.test(email);
// };

const useAddUserForm = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddUserType>({
    defaultValues: {
      name: "",
      level: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const salt = process.env.SOME_CODE;
    const newUsername = data.username + "@email.com";
    const newPassword = `${data.password}${salt}`;

    // 유저 생성
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUsername,
        newPassword
      );
      await setDoc(doc(db, "user", userCredential.user.uid), {
        name: data.name,
        level: data.level,
      });
      reset();
      navigate(-1);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  });

  return { control, errors, onSubmit };
};

export default useAddUserForm;
