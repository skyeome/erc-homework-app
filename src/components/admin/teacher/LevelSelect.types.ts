/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";
import { AddUserType } from "../user/AddUserForm.types";

export interface LevelSelectProps {
  options?: string[];
  control: Control<AddUserType, any>;
  defaultValue?: string;
}
