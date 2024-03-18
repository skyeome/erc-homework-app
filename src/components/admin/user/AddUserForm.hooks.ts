import { useForm } from "react-hook-form";
import { auth } from "@/libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { LoginFormType } from "@/components/auth/LoginForm.types";

// const validateEmail = (email: string): boolean => {
//   // 이메일 형식을 확인하는 정규식
//   const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailRegex.test(email);
// };

const useAddUserForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFormType>({
    defaultValues: {
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
      console.log(userCredential.user);
      reset();
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
