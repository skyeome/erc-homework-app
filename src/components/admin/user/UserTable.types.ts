export type Order = "asc" | "desc";

export interface Student {
  id: number;
  userId: string;
  name: string;
  level: string;
  points: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Student;
  label: string;
  numeric: boolean;
}
