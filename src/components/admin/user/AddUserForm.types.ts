import { LoginFormType } from "@/components/auth/LoginForm.types";

export interface AddUserType extends LoginFormType {
  name: string;
  level: string;
}
