/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";
import { AddUserType } from "./AddUserForm.types";

export interface LevelSelectProps {
  control: Control<AddUserType, any>;
}
