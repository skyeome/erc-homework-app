import { Typography } from "@mui/material";
import AddTeacherForm from "@/components/admin/teacher/AddTeacherForm";

function AddTeacher() {
  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Manage Teachers
      </Typography>
      <AddTeacherForm />
    </div>
  );
}

export default AddTeacher;
