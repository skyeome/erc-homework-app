import { LoginFormType } from "@/components/auth/LoginForm.types";
import { Student } from "@/libs/firestore";

export interface AddUserFormProps {
  defaultValues?: Student;
}

export interface AddUserType extends LoginFormType {
  name: string;
  level: string;
}
