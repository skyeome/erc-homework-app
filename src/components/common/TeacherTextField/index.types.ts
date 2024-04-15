/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddTeacherType } from "@/components/admin/teacher/AddTeacherForm.types";
import { TextFieldProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";

type MuiTextFieldProps = {
  variant?: "filled" | "outlined" | "standard";
} & Omit<TextFieldProps, "variant">;

export interface TeacherTextFieldProps extends MuiTextFieldProps {
  name: "name" | "email" | "password";
  control: Control<AddTeacherType, any>;
  errors: FieldErrors<AddTeacherType>;
}
