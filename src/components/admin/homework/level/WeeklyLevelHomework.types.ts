import { ReadingHomeworkData } from "@/api/admin";
import { HomeworkTypes } from "../../dashboard/notification/index.types";

export interface WeeklyLevelHomeworkProps {
  date: Date;
  category: HomeworkTypes;
  levelName?: string;
  handleOpen?: VoidFunction;
  setModalData?: React.Dispatch<
    React.SetStateAction<ReadingHomeworkData | undefined>
  >;
}
