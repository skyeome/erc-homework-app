import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import AddTeacherForm from "@/components/admin/teacher/AddTeacherForm";

function EditTeacher() {
  const location = useLocation();
  const defaultValues = location.state;

  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Manage Students
      </Typography>
      <AddTeacherForm isEdit defaultValues={defaultValues} />
    </div>
  );
}

export default EditTeacher;
