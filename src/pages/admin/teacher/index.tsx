import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import AllTeachers from "@/components/admin/teacher/TeacherTable";

function AdminTeacher() {
  const navigate = useNavigate();
  const onClickNew = () => {
    navigate("/admin/teacher/add");
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" p={2}>
        <Typography variant="h4" fontWeight={700}>
          Manage Teachers
        </Typography>
        <Button variant="contained" onClick={onClickNew}>
          Add Teachers
        </Button>
      </Stack>
      <AllTeachers />
    </div>
  );
}

export default AdminTeacher;
