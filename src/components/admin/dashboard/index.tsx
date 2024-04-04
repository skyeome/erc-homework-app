import { Stack, Typography } from "@mui/material";
import DateBox from "./datebox";
import ShadowBox from "@/components/common/box";

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" fontWeight={700} p={2}>
        Dashboard
      </Typography>
      <DateBox />
      <Stack direction={{ xs: "column", sm: "row" }} mt={2} gap={2}>
        <ShadowBox p={3} flex={1}>
          asdfsdf
        </ShadowBox>
        <ShadowBox p={3} flex={1}>
          asdfsdf
        </ShadowBox>
      </Stack>
    </div>
  );
}

export default Dashboard;
