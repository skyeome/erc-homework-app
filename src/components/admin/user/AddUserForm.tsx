import useAddUserForm from "./AddUserForm.hooks";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UserTextField from "@/components/common/UserTextField";
import ShadowBox from "@/components/common/box";

function AddUserForm() {
  const { control, errors, onSubmit } = useAddUserForm();

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
            <Autocomplete
              id="selectedClass"
              freeSolo
              options={[
                "Class A",
                "Class B",
                "Class C",
                "Class D1",
                "Class D2",
                "Class D3",
              ]}
              renderInput={(params) => <TextField {...params} />}
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
