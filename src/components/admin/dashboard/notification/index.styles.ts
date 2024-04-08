import { css, styled } from "@mui/material";

const iconWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  width: 26px;
  height: 26px;
  border-radius: 26px;

  color: #fff;
  & svg {
    font-size: 16px;
  }
`;

export const RecordIconWrap = styled("div")`
  ${iconWrap}
  & svg {
    font-size: 20px;
  }
  background-color: #65c3c8;
`;
export const ReadingIconWrap = styled("div")`
  ${iconWrap}
  background-color: #1DCF7A;
`;
export const WorkbookIconWrap = styled("div")`
  ${iconWrap}
  background-color: #8981EC;
`;
