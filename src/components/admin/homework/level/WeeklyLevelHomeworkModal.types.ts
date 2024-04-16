import { ReadingHomeworkData } from "@/api/admin";

export interface WeeklyLevelHomeworkModalProps {
  open: boolean;
  handleClose: VoidFunction;
  modalData?: ReadingHomeworkData;
}
