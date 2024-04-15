import { Controller } from "react-hook-form";
import { InputAdornment, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { TeacherTextFieldProps } from "./index.types";

function TeacherTextField({
  name,
  control,
  errors,
  ...rest
}: TeacherTextFieldProps) {
  const rules =
    name === "email"
      ? {
          required: "이메일은 필수 입니다.",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "이메일 형식으로 입력해주세요",
          },
        }
      : name === "password"
      ? {
          required: "비밀번호는 필수 입니다.",
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/,
            message: "최소 8자, 최소 하나의 문자 + 하나의 숫자를 입력해주세요",
          },
        }
      : {
          required: "이름을 입력해주세요",
        };
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            type={name === "password" ? "password" : "text"}
            autoComplete={
              name === "email"
                ? name
                : name === "password"
                ? "current-password"
                : "off"
            }
            placeholder={
              name === "email"
                ? "아이디를 입력해 주세요"
                : name === "password"
                ? "비밀번호를 입력해 주세요"
                : "이름을 입력해주세요"
            }
            margin="dense"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {name === "email" ? (
                    <PersonIcon />
                  ) : name === "password" ? (
                    <LockIcon />
                  ) : undefined}
                </InputAdornment>
              ),
            }}
            error={Boolean(
              name === "email"
                ? errors.email
                : name === "password"
                ? errors.password
                : errors.name
            )}
            helperText={
              name === "email"
                ? errors.email?.message
                : name === "password"
                ? errors.password?.message
                : errors.name?.message
            }
            {...rest}
            {...field}
          />
        )}
      />
    </div>
  );
}

export default TeacherTextField;
