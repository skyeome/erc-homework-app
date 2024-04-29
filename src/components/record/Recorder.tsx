import { useState, useRef } from "react";
import { Box, Chip, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import * as Styled from "./Recorder.styles";
import { RecorderProps } from "./Recorder.types";

function Recorder({ setChunks, onClose }: RecorderProps) {
  const [recording, setRecording] = useState(false); // 현재 녹음 중인지
  const [time, setTime] = useState(0); // 몇 초간 녹음했는지
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 미디어 녹음기
  const timerRef = useRef<number | null>(null); // 타이머

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // 녹음 버튼을 눌렀을 때 실행
  const handleStartRecording = async () => {
    try {
      // 코덱을 지원하는지 확인
      const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
      const option = {
        mimeType: isSupport ? "audio/webm;codecs=opus" : "audio/mp4",
      };
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, option);
      mediaRecorderRef.current.ondataavailable = (e) => {
        setChunks((prev) => [...prev, e.data]);
      };
      // 녹음 중지 버튼을 눌러서 녹음 정지를 실행했을 때
      mediaRecorderRef.current.onstop = () => {
        setRecording(false); // 녹음 상태를 녹음 중지로 변경
        stopTimer(); // 몇 초 녹음 중인지 재는 타이머 중지
        setTime(0); // 현재 녹음을 0초로 초기화
        if (onClose) onClose();
      };
      mediaRecorderRef.current.start(); // 녹음 시작
      setRecording(true); // 녹음 상태를 녹음중으로 변경
      startTimer(); // 몇 초 녹음 중인지 재는 타이머 시작
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // 녹음 중지 버튼을 눌렀을 때 실행
  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div>
      {/* 몇 초간 녹음했는지 표시 */}
      <Typography textAlign="center">{formatTime(time)}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={1}>
        {recording ? (
          // 녹음 정지 버튼
          <Styled.RecorderButton
            onClick={handleStopRecording}
            color="secondary"
          >
            <StopIcon sx={{ fontSize: 36 }} />
          </Styled.RecorderButton>
        ) : (
          // 녹음 시작 버튼
          <Styled.RecorderButton
            variant="contained"
            color="secondary"
            onClick={handleStartRecording}
          >
            <MicIcon sx={{ fontSize: 36 }} />
          </Styled.RecorderButton>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={1}>
        <Chip
          variant="filled"
          icon={<MonetizationOnIcon />}
          label="+1 Press to record"
        />
      </Box>
    </div>
  );
}

export default Recorder;
