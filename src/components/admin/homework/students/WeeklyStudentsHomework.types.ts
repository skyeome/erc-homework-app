export interface StudentsHomework {
  uid: string;
  name: string;
  mon?: Homeworks;
  tue?: Homeworks;
  wed?: Homeworks;
  thu?: Homeworks;
  fri?: Homeworks;
  sat?: Homeworks;
  sun?: Homeworks;
}

interface Homeworks {
  date?: Date;
  record?: boolean;
  reading?: boolean;
  workbook?: boolean;
  [key: string]: Date | boolean | undefined;
}
