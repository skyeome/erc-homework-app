import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppBar from "@/components/common/appbar";
import WorkBookItem from "@/components/workbook/index.styles";

interface WorkbookLink {
  text: string;
  state: string;
}

const WORKBOOK_LINKS: WorkbookLink[] = [
  {
    text: "Workbook homework",
    state: "new",
  },
  {
    text: "Other homework",
    state: "other",
  },
];

function WorkBook() {
  return (
    <div>
      <AppBar title="Workbook Homework" />
      <Box p={2}>
        {WORKBOOK_LINKS.map((item) => (
          <WorkBookItem key={item.state} borderRadius={2} p={1} mb={2}>
            <Link to="new" state={item.state}>
              <Typography fontWeight={700}>{item.text}</Typography>
              <ChevronRightIcon />
            </Link>
          </WorkBookItem>
        ))}
      </Box>
    </div>
  );
}

export default WorkBook;
