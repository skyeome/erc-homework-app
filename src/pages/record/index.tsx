import { useState } from "react";
import AppBar from "@/components/common/appbar";
import RecordNotice from "@/components/record/RecordNotice";
import Recorder from "@/components/record/Recorder";
import SelectRecordDate from "@/components/record/SelectRecordDate";
import RecordComplete from "@/components/record/RecordComplete";
import RecordScreen from "@/components/record/index.styles";
import WeeklyRecord from "@/components/record/WeeklyRecord";
import Box from "@mui/material/Box";

function Record() {
  const [chunks, setChunks] = useState<Blob[]>([]);

  return (
    <div>
      <AppBar title="Record Homework" />
      {chunks.length <= 0 ? (
        <RecordScreen px={4} pt={1}>
          <Box mb={8}>
            <SelectRecordDate />
            <RecordNotice />
          </Box>
          <Recorder setChunks={setChunks} />
        </RecordScreen>
      ) : (
        <RecordComplete chunks={chunks} setChunks={setChunks} />
      )}
      <WeeklyRecord />
    </div>
  );
}

export default Record;
