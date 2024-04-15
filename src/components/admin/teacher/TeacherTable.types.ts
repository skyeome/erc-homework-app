import { Teacher } from "@/libs/firestore";

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Teacher;
  label: string;
  numeric: boolean;
}
