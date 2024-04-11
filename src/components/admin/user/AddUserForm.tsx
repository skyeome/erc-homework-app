import useAddUserForm from "./AddUserForm.hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserTextField from "@/components/common/UserTextField";
import ShadowBox from "@/components/common/box";
import LevelSelect from "./LevelSelect";
import { AddUserFormProps } from "./AddUserForm.types";

function AddUserForm({ defaultValues }: AddUserFormProps) {
  const { control, errors, onSubmit } = useAddUserForm(defaultValues);

  return (
    <ShadowBox p={3}>
      <form onSubmit={onSubmit} autoComplete="off">
        <Stack direction="row" gap={2}>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700}>
              학생 이름
            </Typography>
            <UserTextField
              name="name"
              control={control}
              errors={errors}
              autoComplete="off"
            />
          </Box>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Class
            </Typography>
            <LevelSelect
              control={control}
              defaultValue={defaultValues?.level}
            />
          </Box>
        </Stack>

        <Typography variant="h4" fontWeight={700} mt={2}>
          아이디
        </Typography>
        <UserTextField
          name="username"
          control={control}
          errors={errors}
          autoComplete="new-username"
        />
        <Typography variant="h4" fontWeight={700} mt={2}>
          비밀번호
        </Typography>
        <UserTextField
          name="password"
          control={control}
          errors={errors}
          autoComplete="new-password"
        />

        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" size="large">
            학생 추가
          </Button>
        </Stack>
      </form>
    </ShadowBox>
  );
}

export default AddUserForm;
