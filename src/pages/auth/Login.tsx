import Logo from "@/components/common/logo";
import LoginForm from "@/components/auth/LoginForm";
import withAuthLogin from "@/components/common/hoc/withAuthLogin";

const Login = withAuthLogin(() => {
  return (
    <div>
      <Logo />
      <LoginForm />
    </div>
  );
});

export default Login;
