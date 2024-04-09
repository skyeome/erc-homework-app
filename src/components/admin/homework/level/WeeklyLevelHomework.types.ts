import { WeeklySetDateAndCategoryProps } from "./WeeklySetDateAndCategory.types";

export type WeeklyLevelHomeworkProps = Omit<
  WeeklySetDateAndCategoryProps,
  "setCategory"
>;
