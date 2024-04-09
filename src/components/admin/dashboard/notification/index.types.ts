export type HomeworkTypes = "record" | "reading" | "workbook";

export interface Noti {
  id: number;
  name: string;
  type: HomeworkTypes;
  date: Date;
}
