import { Button, css, styled } from "@mui/material";

const RecorderBtnCss = css`
  width: 6.625rem;
  height: 6.625rem;
  border-radius: 100%;
  box-shadow: none;
  &:hover,
  &:focus {
    box-shadow: none;
  }
`;

export const RecorderStartButton = styled(Button)`
  ${RecorderBtnCss};
`;

export const RecorderStopButton = styled(Button)`
  ${RecorderBtnCss};
`;
