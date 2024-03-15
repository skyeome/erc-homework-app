import { Controller } from "react-hook-form";
import { InputAdornment, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { UserTextFieldProps } from "./index.types";

function UserTextField({ name, control, errors, ...rest }: UserTextFieldProps) {
  const rules =
    name === "username"
      ? {
          required: "아이디는 필수 입니다.",
          pattern: {
            value: /^erc[0-9]{4}$/,
            message: "erc+숫자 4자리 형식으로 입력해주세요",
          },
        }
      : {
          required: "비밀번호는 필수 입니다.",
          minLength: {
            value: 4,
            message: "숫자 4자리 형식으로 입력해주세요",
          },
          maxLength: {
            value: 4,
            message: "숫자 4자리 형식으로 입력해주세요",
          },
        };
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            type={name === "username" ? "text" : name}
            autoComplete={name === "username" ? name : "current-password"}
            placeholder={
              name === "username"
                ? "아이디를 입력해 주세요"
                : "비밀번호를 입력해 주세요"
            }
            margin="dense"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {name === "username" ? <PersonIcon /> : <LockIcon />}
                </InputAdornment>
              ),
            }}
            error={Boolean(
              name === "username" ? errors.username : errors.password
            )}
            helperText={
              name === "username"
                ? errors.username?.message
                : errors.password?.message
            }
            {...rest}
            {...field}
          />
        )}
      />
    </div>
  );
}

export default UserTextField;
