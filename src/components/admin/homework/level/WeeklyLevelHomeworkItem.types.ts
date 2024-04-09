import {
  ReadingHomeworkData,
  RecordHomeworkData,
  WorkbookHomeworkData,
} from "@/api/admin";

export interface WeeklyLevelHomeworkRecordProps {
  data?: RecordHomeworkData;
}
export interface WeeklyLevelHomeworkReadingProps {
  data?: ReadingHomeworkData;
}
export interface WeeklyLevelHomeworkWorkbookProps {
  data?: WorkbookHomeworkData;
}
