/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddUserType } from "@/components/admin/user/AddUserForm.types";
import { TextFieldProps } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";

type MuiTextFieldProps = {
  variant?: "filled" | "outlined" | "standard";
} & Omit<TextFieldProps, "variant">;

export interface UserTextFieldProps extends MuiTextFieldProps {
  name: "name" | "username" | "password";
  control: Control<AddUserType, any>;
  errors: FieldErrors<AddUserType>;
}
