import { HomeworkTypes } from "../../dashboard/notification/index.types";

export interface WeeklySetDateAndCategoryProps {
  date: Date;
  setCategory: React.Dispatch<React.SetStateAction<HomeworkTypes>>;
}
