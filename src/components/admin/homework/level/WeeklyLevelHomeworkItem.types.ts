import {
  ReadingHomeworkData,
  RecordHomeworkData,
  WorkbookHomeworkData,
} from "@/api/admin";

export interface WeeklyLevelHomeworkItemProps {
  complete?: boolean;
}

export interface WeeklyLevelHomeworkRecordProps {
  data?: RecordHomeworkData;
}
export interface WeeklyLevelHomeworkReadingProps {
  data?: ReadingHomeworkData;
  handleClick?: (id: string) => void;
}
export interface WeeklyLevelHomeworkWorkbookProps {
  data?: WorkbookHomeworkData;
  handleClick?: (id: string) => void;
}
