import AppBar from "@/components/common/appbar";
import AddBook from "@/components/reading/AddBook";
import ReadBooks from "@/components/reading/ReadBooks";

function Reading() {
  return (
    <div>
      <AppBar title="Reading Homework" />
      <ReadBooks />
      <AddBook />
    </div>
  );
}

export default Reading;
