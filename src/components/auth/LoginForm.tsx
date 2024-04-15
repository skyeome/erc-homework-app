import { Button, Typography } from "@mui/material";
import useLoginForm from "./LoginForm.hooks";
import UserTextField from "../common/UserTextField";
import IOSSwitch from "../common/IOSSwitch";
import * as Styled from "./LoginForm.styles";

function LoginForm() {
  const { control, errors, isTeacher, onClickSwitch, onSubmit } =
    useLoginForm();

  return (
    <Styled.LoginWrap onSubmit={onSubmit}>
      <UserTextField
        name="username"
        control={control}
        errors={errors}
        rules={{
          required: "아이디는 필수 입니다.",
        }}
      />
      <UserTextField
        name="password"
        control={control}
        errors={errors}
        rules={{
          required: "비밀번호는 필수 입니다.",
        }}
      />
      <Styled.PreserveLoginBox>
        <Typography variant="body2">선생님 로그인</Typography>
        <IOSSwitch checked={isTeacher} onChange={onClickSwitch} />
      </Styled.PreserveLoginBox>
      <Button type="submit" variant="contained" size="large" fullWidth>
        로그인
      </Button>
    </Styled.LoginWrap>
  );
}

export default LoginForm;
