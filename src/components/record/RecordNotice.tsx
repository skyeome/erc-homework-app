import { Typography } from "@mui/material";
import RecordNoticeWrap from "./RecordNotice.styles";

function RecordNotice() {
  return (
    <RecordNoticeWrap mt={2} borderRadius={2}>
      <Typography variant="body2" sx={{ textIndent: "-1rem" }}>
        💡녹음 시, 어려우면 초반에는 (3~5일) 음원 들으며
        <br />
        <b>
          <u>정확하게 따라하는 연습!</u>
        </b>
        <br />
        <br />
        1) 듣고 따라하기 2번 👆
        <br />
        2) 동시에 따라 읽기 2번
        <br />
        3) 녹음 (어렵다면, 음원 듣고 따라하며 녹음){" "}
        <b>
          <u>*정확하게</u>
        </b>
        <br />
      </Typography>
    </RecordNoticeWrap>
  );
}

export default RecordNotice;
