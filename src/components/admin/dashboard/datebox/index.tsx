import { format } from "date-fns";
import { Box, Stack, Typography } from "@mui/material";
import { generateWeekDates } from "@/hooks/getWeekDate";
import ShadowBox from "@/components/common/box";
import DateBoxDay from "./index.styles";

function DateBox() {
  const weeks = generateWeekDates();

  return (
    <ShadowBox p={3}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Typography variant="h3" fontWeight={700} width={150}>
          {format(new Date(), "yyyy-MM-dd")}
        </Typography>
        <Stack direction="row" gap={{ xs: 0, sm: 2, md: 4 }}>
          {weeks.map((day) => (
            <DateBoxDay
              key={format(day, "dd")}
              px={1}
              py={2}
              isactive={`${format(new Date(), "dd") === format(day, "dd")}`}
            >
              <Typography variant="h4" fontWeight={700}>
                {format(day, "EEE")}.
              </Typography>
              <Typography variant="body1" textAlign="center">
                {format(day, "dd")}
              </Typography>
            </DateBoxDay>
          ))}
        </Stack>
        <Box width={150} />
      </Stack>
    </ShadowBox>
  );
}

export default DateBox;
