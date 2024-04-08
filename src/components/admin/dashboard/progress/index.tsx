import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShadowBox from "@/components/common/box";
import { Progress } from "./index.types";
import * as Styled from "./index.styles";

const PROGRESS: Progress[] = [
  {
    name: "Class A",
    progress: 0.33,
  },
  {
    name: "Class B",
    progress: 0.5,
  },
  {
    name: "Class C",
    progress: 0.33,
  },
  {
    name: "Class D",
    progress: 0.7,
  },
  {
    name: "Class D1",
    progress: 0.66,
  },
  {
    name: "Class D2",
    progress: 0.5,
  },
];

function AdminProgress() {
  return (
    <ShadowBox p={3} flex={1}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={700}>
          Homeworks Progress
        </Typography>
        <Link to="">
          More
          <ChevronRightIcon sx={{ verticalAlign: "middle" }} />
        </Link>
      </Stack>
      <Stack gap={1}>
        {PROGRESS.map((item) => (
          <Stack
            key={item.name}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            py={1.5}
          >
            <Typography variant="body1">{item.name}</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              <Styled.ProgressBarBg>
                <Styled.ProgressBar percent={`${item.progress * 100}`} />
              </Styled.ProgressBarBg>
              <Typography variant="body2">{item.progress * 100}%</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </ShadowBox>
  );
}

export default AdminProgress;
