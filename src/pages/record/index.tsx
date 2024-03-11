import { useState } from "react";
import AppBar from "@/components/common/appbar";
import RecordNotice from "@/components/record/RecordNotice";
import Recorder from "@/components/record/Recorder";
import SelectRecordDate from "@/components/record/SelectRecordDate";
import RecordComplete from "@/components/record/RecordComplete";
import RecordScreen from "@/components/record/index.styles";

function Record() {
  const [chunks, setChunks] = useState<Blob[]>([]);

  return (
    <div>
      <AppBar title="Record Homework" />
      {chunks.length <= 0 ? (
        <RecordScreen px={4} pt={1}>
          <div>
            <SelectRecordDate />
            <RecordNotice />
          </div>
          <Recorder setChunks={setChunks} />
        </RecordScreen>
      ) : (
        <RecordComplete chunks={chunks} setChunks={setChunks} />
      )}
    </div>
  );
}

export default Record;
