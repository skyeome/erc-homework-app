import { useLocation } from "react-router-dom";
import AppBar from "@/components/common/appbar";
import UploadFields from "@/components/reading/new/UploadFields";

function NewReadingHomework() {
  const location = useLocation();
  const uploadState = location.state;

  return (
    <div>
      <AppBar title="Reading Homework" />
      <UploadFields
        type={uploadState.type}
        title={uploadState.title}
        image={uploadState.image}
      />
    </div>
  );
}

export default NewReadingHomework;
