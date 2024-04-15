import { Stack, Typography } from "@mui/material";
import DateBox from "@/components/admin/dashboard/datebox";
import AdminNotification from "@/components/admin/dashboard/notification";
import AdminProgress from "@/components/admin/dashboard/progress";
import useRequestPermission from "@/hooks/requestPermission";

function Dashboard() {
  useRequestPermission();
  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Dashboard
      </Typography>
      <DateBox />
      <Stack direction={{ xs: "column", sm: "row" }} mt={2} gap={2}>
        <AdminProgress />
        <AdminNotification />
      </Stack>
    </div>
  );
}

export default Dashboard;
