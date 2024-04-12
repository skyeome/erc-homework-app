import { SetURLSearchParams } from "react-router-dom";
import { HomeworkTypes } from "../../dashboard/notification/index.types";

export interface WeeklySetDateAndCategoryProps {
  date: Date;
  category: HomeworkTypes;
  setCategory: React.Dispatch<React.SetStateAction<HomeworkTypes>>;
  setSearchParams: SetURLSearchParams;
}
