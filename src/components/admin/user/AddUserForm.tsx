import useAddUserForm from "./AddUserForm.hooks";
import UserTextField from "@/components/common/UserTextField";
import { Button } from "@mui/material";

function AddUserForm() {
  const { control, errors, onSubmit } = useAddUserForm();

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <UserTextField
        name="name"
        control={control}
        errors={errors}
        autoComplete="off"
      />
      <UserTextField
        name="username"
        control={control}
        errors={errors}
        autoComplete="new-username"
      />
      <UserTextField
        name="password"
        control={control}
        errors={errors}
        autoComplete="new-password"
      />
      <Button type="submit" variant="contained" size="large" fullWidth>
        학생 계정 추가
      </Button>
    </form>
  );
}

export default AddUserForm;
