import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import IOSSwitch from "../common/IOSSwitch";
import { LoginFormType } from "./LoginForm.types";
import * as Styled from "./LoginForm.styles";

function LoginForm() {
  const [keepLogin, setKeepLogin] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data: LoginFormType) => {
    console.log(data, keepLogin);
  });

  return (
    <Styled.LoginWrap onSubmit={onSubmit}>
      <div>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              autoComplete="username"
              placeholder="아이디를 입력해 주세요"
              margin="dense"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Typography>{errors.username?.message}</Typography>
      </div>
      <div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해 주세요"
              margin="dense"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Typography>{errors.password?.message}</Typography>
      </div>
      <Styled.PreserveLoginBox>
        <Typography variant="body2">로그인 유지</Typography>
        <IOSSwitch
          value={keepLogin}
          onChange={() => setKeepLogin((prev) => !prev)}
        />
      </Styled.PreserveLoginBox>
      <Button
        type="submit"
        variant="contained"
        size="large"
        // disabled={Boolean(errors)}
        fullWidth
      >
        로그인
      </Button>
    </Styled.LoginWrap>
  );
}

export default LoginForm;
