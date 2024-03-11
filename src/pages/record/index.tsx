import AppBar from "@/components/common/appbar";
import RecordNotice from "@/components/record/RecordNotice";
import SelectRecordDate from "@/components/record/SelectRecordDate";
import Box from "@mui/material/Box";

function Record() {
  return (
    <div>
      <AppBar title="Record Homework" />
      <Box px={4}>
        <SelectRecordDate />
        <RecordNotice />
      </Box>
    </div>
  );
}

export default Record;
