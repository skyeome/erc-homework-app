import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import DatePicker, { registerLocale } from "react-datepicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import useModal from "@/hooks/useModal";
import * as Styled from "./SelectRecordDate.styles";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { setDate } from "@/libs/dateSlice";

registerLocale("ko", ko);

function SelectRecordDate() {
  const now = new Date();
  const prevWeek = new Date();
  prevWeek.setDate(prevWeek.getDate() - 7);
  const { open, handleOpen, handleClose } = useModal();
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.date.value);

  const handleChangeDate = (date: Date | null) => {
    if (date !== null) {
      dispatch(setDate({ value: date }));
      handleClose();
    }
  };

  return (
    <>
      <Styled.SelectDateArea onClick={handleOpen}>
        <Typography fontSize={16} fontWeight={600} textAlign="center">
          <DateRangeIcon sx={{ verticalAlign: "sub", marginRight: 1 }} />
          {format(date, "yyyy년 MM월 dd일")}
        </Typography>
      </Styled.SelectDateArea>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Styled.SelectDateModalBox boxShadow={24}>
          <DatePicker
            locale="ko"
            minDate={prevWeek} // minDate 이전 날짜 선택 불가
            maxDate={now} // maxDate 이후 날짜 선택 불가
            selected={date}
            onChange={handleChangeDate}
            filterDate={(date) => {
              // Disable weekends (Saturday and Sunday)
              return date.getDay() !== 0 && date.getDay() !== 6;
            }}
            inline
          />
        </Styled.SelectDateModalBox>
      </Modal>
    </>
  );
}

export default SelectRecordDate;
