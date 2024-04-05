import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import AllUsers from "@/components/admin/user/UserTable";

function AdminUser() {
  const navigate = useNavigate();
  const onClickNew = () => {
    navigate("/admin/user/add");
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" p={2}>
        <Typography variant="h4" fontWeight={700}>
          Manage Students
        </Typography>
        <Button variant="contained" onClick={onClickNew}>
          Add Student
        </Button>
      </Stack>
      <AllUsers />
    </div>
  );
}

export default AdminUser;
