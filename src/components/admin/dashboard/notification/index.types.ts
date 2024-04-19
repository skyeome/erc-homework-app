export const HOMEWORK_LIST = [
  "all",
  "record",
  "reading",
  "workbook",
  "other",
] as const;

export type HomeworkType = (typeof HOMEWORK_LIST)[number];
