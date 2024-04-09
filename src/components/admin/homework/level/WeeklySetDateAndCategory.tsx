import { useAppDispatch } from "@/hooks/useReduxHook";
import { setDate } from "@/libs/dateSlice";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { HomeworkTypes } from "../../dashboard/notification/index.types";
import { WeeklySetDateAndCategoryProps } from "./WeeklySetDateAndCategory.types";

function WeeklySetDateAndCategory({
  date,
  category,
  setCategory,
}: WeeklySetDateAndCategoryProps) {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as HomeworkTypes);
  };

  const onChangeDate = (value: Date | null) => {
    if (value !== null) dispatch(setDate({ value }));
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box p={2}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="record">Record</MenuItem>
            <MenuItem value="reading">Reading</MenuItem>
            <MenuItem value="workbook">Workbook</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <StaticDatePicker defaultValue={date} onAccept={onChangeDate} />
    </Paper>
  );
}

export default WeeklySetDateAndCategory;
