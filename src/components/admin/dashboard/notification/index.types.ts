type NotiTypes = "record" | "reading" | "workbook";

export interface Noti {
  id: number;
  name: string;
  type: NotiTypes;
  date: Date;
}
