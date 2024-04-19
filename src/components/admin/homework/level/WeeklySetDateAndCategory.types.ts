import { SetURLSearchParams } from "react-router-dom";
import { HomeworkType } from "../../dashboard/notification/index.types";

export interface WeeklySetDateAndCategoryProps {
  date: Date;
  category: HomeworkType;
  setCategory: React.Dispatch<React.SetStateAction<HomeworkType>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}
