import { Teacher } from "@/libs/firestore";

export interface AddTeacherFormProps {
  isEdit?: boolean;
  defaultValues?: Teacher;
}

export interface LoginTeacherType {
  email: string;
  password: string;
}

export interface AddTeacherType extends LoginTeacherType {
  name: string;
  level: string;
}
