/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormType } from "@/components/auth/LoginForm.types";
import { TextFieldProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";

type MuiTextFieldProps = {
  variant?: "filled" | "outlined" | "standard";
} & Omit<TextFieldProps, "variant">;

export interface UserTextFieldProps extends MuiTextFieldProps {
  name: "username" | "password";
  control: Control<LoginFormType, any>;
  errors: FieldErrors<LoginFormType>;
}
