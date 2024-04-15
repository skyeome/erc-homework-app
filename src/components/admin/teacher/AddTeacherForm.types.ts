import { Student } from "@/libs/firestore";

export interface AddTeacherFormProps {
  isEdit?: boolean;
  defaultValues?: Student;
}

export interface LoginTeacherType {
  email: string;
  password: string;
}

export interface AddTeacherType extends LoginTeacherType {
  name: string;
  level: string;
}
