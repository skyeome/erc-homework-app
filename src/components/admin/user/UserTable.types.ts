import { Student } from "@/libs/firestore";

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Student;
  label: string;
  numeric: boolean;
}
