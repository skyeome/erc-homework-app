import { Typography } from "@mui/material";
import AddUserForm from "@/components/admin/user/AddUserForm";

function AddUser() {
  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Manage Students
      </Typography>
      <AddUserForm />
    </div>
  );
}

export default AddUser;
