import { HomeworkTypes } from "../../dashboard/notification/index.types";

export interface WeeklyLevelHomeworkProps {
  date: Date;
  category: HomeworkTypes;
  levelName?: string;
}
