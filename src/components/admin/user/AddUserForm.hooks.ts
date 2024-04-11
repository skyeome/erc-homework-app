import { useForm } from "react-hook-form";
import { auth, db } from "@/libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { AddUserType } from "./AddUserForm.types";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Student } from "@/libs/firestore";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "@/api/admin";

// const validateEmail = (email: string): boolean => {
//   // 이메일 형식을 확인하는 정규식
//   const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailRegex.test(email);
// };

const useAddUserForm = (isEdit?: boolean, defaultValues?: Student) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddUserType>({
    defaultValues: defaultValues ?? {
      name: "",
      level: "",
      username: "",
      password: "",
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["levels", "list"],
    queryFn: getLevels,
  });

  const onSubmit = handleSubmit(async (data) => {
    const salt = process.env.SOME_CODE;
    const newUsername = data.username + "@email.com";
    const newPassword = `${data.password}${salt}`;

    // 유저 생성
    try {
      const batch = writeBatch(db);

      if (!isEdit) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          newUsername,
          newPassword
        );
        // 유저 생성
        const userRef = doc(db, "user", userCredential.user.uid);
        batch.set(userRef, {
          username: data.username,
          name: data.name,
          level: data.level,
          points: 0,
        });
      } else {
        // 유저 수정
        if (defaultValues) {
          const userRef = doc(db, "user", defaultValues.id);
          batch.update(userRef, {
            username: data.username,
            name: data.name,
            level: data.level,
          });
        }
      }

      // 원래 없던 반이 생성되면 추가한다.
      const levelRef = doc(db, "levels", "list");
      batch.update(levelRef, { options: arrayUnion(data.level) });

      await batch.commit();

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

  return { control, errors, onSubmit, options: data, isLoading };
};

export default useAddUserForm;
