import { useLocation } from "react-router-dom";

import AppBar from "@/components/common/appbar";
import UploadFields from "@/components/reading/new/UploadFields";

function NewWorkBook() {
  const location = useLocation();
  const uploadState = location.state;

  return (
    <div>
      <AppBar
        title={
          uploadState.type === "workbook"
            ? "Workbook Homework"
            : "Other Homework"
        }
      />
      <UploadFields type={uploadState.type} />
    </div>
  );
}

export default NewWorkBook;
