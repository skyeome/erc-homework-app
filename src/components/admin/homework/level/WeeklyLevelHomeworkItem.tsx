import { PropsWithChildren } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HideImageIcon from "@mui/icons-material/HideImage";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "@mui/icons-material/Mic";
import {
  WeeklyLevelHomeworkReadingProps,
  WeeklyLevelHomeworkRecordProps,
  WeeklyLevelHomeworkWorkbookProps,
} from "./WeeklyLevelHomeworkItem.types";
import * as Styled from "./WeeklyLevelHomeworkItem.styles";

function WeeklyLevelHomeworkItem({ children }: PropsWithChildren) {
  return (
    <Styled.WeeklyLevelHomeworkItemBox>
      {children}
    </Styled.WeeklyLevelHomeworkItemBox>
  );
}

const WeeklyLevelHomeworkRecord = ({
  data,
}: WeeklyLevelHomeworkRecordProps) => {
  const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
  return (
    <Styled.WeeklyLevelHomeworkRecordWrap mt={1.5}>
      <audio controls>
        <source
          src={data?.recordUrl}
          type={isSupport ? "audio/webm" : "audio/mp4"}
        />
      </audio>
    </Styled.WeeklyLevelHomeworkRecordWrap>
  );
};
const WeeklyLevelHomeworkReading = ({
  data,
}: WeeklyLevelHomeworkReadingProps) => {
  return (
    <Stack direction="row" mt={1.5} gap={1.5}>
      {data?.thumb !== undefined && data?.thumb !== "" ? (
        <Styled.WeeklyLevelHomeworkReadingWrap width={35} height={55}>
          <img
            src={data?.thumb || data?.images[0]?.imageUrl}
            alt={data?.title}
          />
        </Styled.WeeklyLevelHomeworkReadingWrap>
      ) : (
        <Styled.WeeklyLevelHomeworkReadingWrap
          width={35}
          height={55}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <HideImageIcon fontSize="small" color="disabled" />
        </Styled.WeeklyLevelHomeworkReadingWrap>
      )}
      <div>
        <Typography mt={0.5}>{data?.title}</Typography>
        <Stack direction="row" gap={1}>
          <Typography color="GrayText">
            <ImageIcon fontSize="small" sx={{ verticalAlign: "text-bottom" }} />{" "}
            {data?.images.length}
          </Typography>
          {data?.record !== undefined && (
            <Typography color="GrayText">
              <MicIcon fontSize="small" sx={{ verticalAlign: "text-bottom" }} />
            </Typography>
          )}
        </Stack>
      </div>
    </Stack>
  );
};
const WeeklyLevelHomeworkWorkbook = ({
  data,
}: WeeklyLevelHomeworkWorkbookProps) => {
  return (
    <Stack direction="row" mt={1.5} gap={1.5}>
      {data?.images[0] !== undefined && data?.images[0].imageUrl !== "" ? (
        <Styled.WeeklyLevelHomeworkReadingWrap width={35} height={55}>
          <img src={data?.images[0]?.imageUrl} alt={data?.title} />
        </Styled.WeeklyLevelHomeworkReadingWrap>
      ) : (
        <Styled.WeeklyLevelHomeworkReadingWrap
          width={35}
          height={55}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <HideImageIcon fontSize="small" color="disabled" />
        </Styled.WeeklyLevelHomeworkReadingWrap>
      )}
      <div>
        <Typography mt={0.5}>{data?.title}</Typography>
        <Stack direction="row" gap={1}>
          <Typography color="GrayText">
            <ImageIcon fontSize="small" sx={{ verticalAlign: "text-bottom" }} />{" "}
            {data?.images.length}
          </Typography>
          {data?.record !== undefined && (
            <Typography color="GrayText">
              <MicIcon fontSize="small" sx={{ verticalAlign: "text-bottom" }} />
            </Typography>
          )}
        </Stack>
      </div>
    </Stack>
  );
};

WeeklyLevelHomeworkItem.Record = WeeklyLevelHomeworkRecord;
WeeklyLevelHomeworkItem.Reading = WeeklyLevelHomeworkReading;
WeeklyLevelHomeworkItem.Workbook = WeeklyLevelHomeworkWorkbook;

export default WeeklyLevelHomeworkItem;
