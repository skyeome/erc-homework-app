export type HomeworkTypes = "record" | "reading" | "workbook" | "other";

export interface Noti {
  id: number;
  name: string;
  type: HomeworkTypes;
  date: Date;
}
