type NotiTypes = "record" | "reading" | "workbook";

export interface Noti {
  name: string;
  type: NotiTypes;
  date: Date;
}
