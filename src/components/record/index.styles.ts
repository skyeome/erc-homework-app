import { Box, styled } from "@mui/material";

const RecordScreen = styled(Box)`
  & audio {
    width: 100%;
  }
  & .text-center {
    text-align: center;
  }
  & .download-link {
    display: inline-block;
    padding: 0.625rem;
    color: inherit;
    text-decoration: none;

    & svg {
      vertical-align: middle;
    }
  }
`;

export default RecordScreen;
