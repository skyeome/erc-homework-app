import { useLocation } from "react-router-dom";

import AppBar from "@/components/common/appbar";
import UploadFields from "@/components/reading/new/UploadFields";

function NewWorkBook() {
  const location = useLocation();
  console.log(location.state);

  return (
    <div>
      <AppBar
        title={
          location.state === "new" ? "Workbook Homework" : "Other Homework"
        }
      />
      <UploadFields />
    </div>
  );
}

export default NewWorkBook;
