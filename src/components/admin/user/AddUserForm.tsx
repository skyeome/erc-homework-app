import useAddUserForm from "./AddUserForm.hooks";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserTextField from "@/components/common/UserTextField";
import ShadowBox from "@/components/common/box";
import LevelSelect from "./LevelSelect";
import { AddUserFormProps } from "./AddUserForm.types";

function AddUserForm({ isEdit, defaultValues }: AddUserFormProps) {
  const { control, errors, onSubmit, options, isLoading } = useAddUserForm(
    isEdit,
    defaultValues
  );

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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <LevelSelect
                options={options}
                control={control}
                defaultValue={defaultValues?.level}
              />
            )}
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
        {!isEdit && (
          <>
            <Typography variant="h4" fontWeight={700} mt={2}>
              비밀번호
            </Typography>
            <UserTextField
              name="password"
              control={control}
              errors={errors}
              autoComplete="new-password"
            />
          </>
        )}

        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" size="large">
            {!isEdit ? "학생 추가" : "학생 수정"}
          </Button>
        </Stack>
      </form>
    </ShadowBox>
  );
}

export default AddUserForm;
