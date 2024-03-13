// import { useLocation } from "react-router-dom";
import AppBar from "@/components/common/appbar";
import UploadFields from "@/components/reading/new/UploadFields";

function NewReadingHomework() {
  // const location = useLocation();
  // console.log(location.state);
  return (
    <div>
      <AppBar title="Reading Homework" />
      <UploadFields />
    </div>
  );
}

export default NewReadingHomework;
