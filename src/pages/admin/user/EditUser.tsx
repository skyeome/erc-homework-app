import { Typography } from "@mui/material";
import AddUserForm from "@/components/admin/user/AddUserForm";
import { useLocation } from "react-router-dom";

function EditUser() {
  const location = useLocation();
  const defaultValues = location.state;

  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Manage Students
      </Typography>
      <AddUserForm defaultValues={defaultValues} />
    </div>
  );
}

export default EditUser;
