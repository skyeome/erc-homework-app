import { Controller } from "react-hook-form";
import { InputAdornment, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { UserTextFieldProps } from "./index.types";

function UserTextField({
  name,
  control,
  errors,
  rules,
  ...rest
}: UserTextFieldProps) {
  const validateRules =
    name === "username"
      ? {
          required: "아이디는 필수 입니다.",
          pattern: {
            value: /^erc[0-9]{4}$/,
            message: "erc+숫자 4자리 형식으로 입력해주세요",
          },
        }
      : name === "password"
      ? {
          required: "비밀번호는 필수 입니다.",
          minLength: {
            value: 4,
            message: "숫자 4자리 형식으로 입력해주세요",
          },
          maxLength: {
            value: 4,
            message: "숫자 4자리 형식으로 입력해주세요",
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
        rules={rules ?? validateRules}
        render={({ field }) => (
          <TextField
            type={name === "password" ? "password" : "text"}
            autoComplete={
              name === "username"
                ? name
                : name === "password"
                ? "current-password"
                : "off"
            }
            placeholder={
              name === "username"
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
                  {name === "username" ? (
                    <PersonIcon />
                  ) : name === "password" ? (
                    <LockIcon />
                  ) : undefined}
                </InputAdornment>
              ),
            }}
            error={Boolean(
              name === "username"
                ? errors.username
                : name === "password"
                ? errors.password
                : errors.name
            )}
            helperText={
              name === "username"
                ? errors.username?.message
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

export default UserTextField;
