import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { LevelSelectProps } from "./LevelSelect.types";

function LevelSelect({ options, control, defaultValue }: LevelSelectProps) {
  const defaultOptions = [
    "B레벨",
    "D레벨 (1)",
    "D레벨 (2)",
    "D레벨 (3)",
    "E레벨",
    "E레벨 (2)",
    "[금] 스피킹",
    "[월] 도서관",
  ];

  return (
    <Controller
      name="level"
      control={control}
      render={({ field: { ref, onChange, ...field } }) => (
        <Autocomplete
          id="level"
          freeSolo
          options={options ?? defaultOptions}
          onChange={(_, data) => onChange(data)}
          onInputChange={(_, data) => {
            if (data) onChange(data);
          }}
          defaultValue={defaultValue ?? defaultOptions[0]}
          renderInput={(params) => (
            <TextField {...params} {...field} inputRef={ref} />
          )}
        />
      )}
    />
  );
}

export default LevelSelect;
