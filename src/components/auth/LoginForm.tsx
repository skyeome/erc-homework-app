import { Button, Typography } from "@mui/material";
import useLoginForm from "./LoginForm.hooks";
import UserTextField from "../common/UserTextField";
import IOSSwitch from "../common/IOSSwitch";
import * as Styled from "./LoginForm.styles";

function LoginForm() {
  const { control, errors, keepLogin, onClickSwitch, onSubmit } =
    useLoginForm();

  return (
    <Styled.LoginWrap onSubmit={onSubmit}>
      <UserTextField name="username" control={control} errors={errors} />
      <UserTextField name="password" control={control} errors={errors} />
      <Styled.PreserveLoginBox>
        <Typography variant="body2">로그인 유지</Typography>
        <IOSSwitch
          checked={keepLogin}
          onChange={onClickSwitch}
          defaultChecked
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
