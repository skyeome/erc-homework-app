import { PropsWithChildren } from "react";
import { HomeworkTypes } from "../../dashboard/notification/index.types";

interface HomeworkProps {
  type: HomeworkTypes;
}

export type WeeklyLevelHomeworkItemProps = PropsWithChildren<HomeworkProps>;
