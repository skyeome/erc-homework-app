import { useForm } from "react-hook-form";
import { auth, db } from "@/libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { AddTeacherType } from "./AddTeacherForm.types";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Student } from "@/libs/firestore";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "@/api/admin";

const useAddTeacherForm = (isEdit?: boolean, defaultValues?: Student) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddTeacherType>({
    defaultValues: defaultValues ?? {
      name: "",
      level: "",
      email: "",
      password: "",
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["levels", "list"],
    queryFn: getLevels,
  });

  const onSubmit = handleSubmit(async (data) => {
    // 유저 생성
    try {
      const batch = writeBatch(db);

      if (!isEdit) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // 유저 생성
        const userRef = doc(db, "teacher", userCredential.user.uid);
        batch.set(userRef, {
          email: data.email,
          name: data.name,
          level: data.level,
          teacher: true,
        });
      } else {
        // 유저 수정
        if (defaultValues) {
          const userRef = doc(db, "teacher", defaultValues.id);
          batch.update(userRef, {
            email: data.email,
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

export default useAddTeacherForm;
