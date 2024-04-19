import { ReadingHomeworkData } from "@/api/admin";
import { HomeworkType } from "../../dashboard/notification/index.types";

export interface WeeklyLevelHomeworkProps {
  date: Date;
  category: HomeworkType;
  levelName?: string;
  handleOpen?: VoidFunction;
  setModalData?: React.Dispatch<
    React.SetStateAction<ReadingHomeworkData | undefined>
  >;
}
