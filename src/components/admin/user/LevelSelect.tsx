import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { LevelSelectProps } from "./LevelSelect.types";

function LevelSelect({ control }: LevelSelectProps) {
  const options = [
    "Class A",
    "Class B",
    "Class C",
    "Class D1",
    "Class D2",
    "Class D3",
  ];

  return (
    <Controller
      name="level"
      control={control}
      render={({ field: { ref, onChange, ...field } }) => (
        <Autocomplete
          id="level"
          freeSolo
          options={options}
          onChange={(_, data) => onChange(data)}
          defaultValue={options[0]}
          renderInput={(params) => (
            <TextField {...params} {...field} inputRef={ref} />
          )}
        />
      )}
    />
  );
}

export default LevelSelect;
