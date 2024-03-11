import { useState } from "react";
import Modal from "@mui/material/Modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import useModal from "@/hooks/useModal";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker.css";
import * as Styled from "./SelectRecordDate.styles";
import { format } from "date-fns";

registerLocale("ko", ko);

function SelectRecordDate() {
  const now = new Date();
  const { open, handleOpen, handleClose } = useModal();
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  const handleChangeDate = (date: Date | null) => {
    if (date !== null) {
      setSelectedDate(date);
      handleClose();
    }
  };

  return (
    <>
      <Styled.SelectDateArea onClick={handleOpen}>
        {format(selectedDate ?? now, "yyyy년 MM월 dd일")}
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
            minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={selectedDate}
            onChange={handleChangeDate}
            inline
          />
        </Styled.SelectDateModalBox>
      </Modal>
    </>
  );
}

export default SelectRecordDate;
