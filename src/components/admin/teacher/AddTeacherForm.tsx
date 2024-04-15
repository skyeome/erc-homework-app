import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TeacherTextField from "@/components/common/TeacherTextField";
import ShadowBox from "@/components/common/box";
import LevelSelect from "./LevelSelect";
import useAddTeacherForm from "./AddTeacherForm.hooks";
import { AddTeacherFormProps } from "./AddTeacherForm.types";

function AddTeacherForm({ isEdit, defaultValues }: AddTeacherFormProps) {
  const { control, errors, onSubmit, options, isLoading } = useAddTeacherForm(
    isEdit,
    defaultValues
  );

  return (
    <ShadowBox p={3}>
      <form onSubmit={onSubmit} autoComplete="off">
        <Stack direction="row" gap={2}>
          <Box flex={1}>
            <Typography variant="h4" fontWeight={700}>
              선생님 이름
            </Typography>
            <TeacherTextField
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
        <TeacherTextField
          name="email"
          control={control}
          errors={errors}
          autoComplete="new-email"
        />
        {!isEdit && (
          <>
            <Typography variant="h4" fontWeight={700} mt={2}>
              비밀번호
            </Typography>
            <TeacherTextField
              name="password"
              control={control}
              errors={errors}
              autoComplete="new-password"
            />
          </>
        )}

        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" size="large">
            {!isEdit ? "선생님 추가" : "선생님 수정"}
          </Button>
        </Stack>
      </form>
    </ShadowBox>
  );
}

export default AddTeacherForm;
