import { useController, useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useReduxHook";
import { setDate } from "@/libs/dateSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { HomeworkTypes } from "../../dashboard/notification/index.types";
import { WeeklySetDateAndCategoryProps } from "./WeeklySetDateAndCategory.types";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function WeeklySetDateAndCategory({
  date,
  setCategory,
}: WeeklySetDateAndCategoryProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      category: "record",
      date,
    },
  });
  const {
    field: { value, onChange },
  } = useController({ name: "category", control });

  const {
    field: { value: dateValue, onChange: onChangeDate },
  } = useController({ name: "date", control });

  const dispatch = useAppDispatch();

  // const handleChange = (event: SelectChangeEvent) => {
  //   setCategory(event.target.value as HomeworkTypes);
  // };

  // const onChangeDate = (value: Date | null) => {
  //   if (value !== null) dispatch(setDate({ value }));
  // };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setCategory(data.category as HomeworkTypes);
    dispatch(setDate({ value: data.date }));
  });

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box component="form" p={2} onSubmit={onSubmit}>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={value}
              label="Category"
              onChange={onChange}
            >
              <MenuItem value="record">Record</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="workbook">Workbook</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DateCalendar value={dateValue} onChange={onChangeDate} />
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="outlined">
            Search!
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default WeeklySetDateAndCategory;
