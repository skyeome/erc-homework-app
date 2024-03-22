import { useState, useRef } from "react";
import { Box, Chip, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import * as Styled from "./Recorder.styles";
import { RecorderProps } from "./Recorder.types";

function Recorder({ setChunks, onClose }: RecorderProps) {
  const [recording, setRecording] = useState(false); // 현재 녹음 중인지
  const [time, setTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 미디어 녹음기
  const timerRef = useRef<number | null>(null);

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
      const isSupport = MediaRecorder.isTypeSupported("audio/webm;codecs=opus");
      console.log(isSupport);
      const option = {
        mimeType: isSupport ? "audio/webm;codecs=opus" : "audio/mp4",
      };
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, option);
      mediaRecorderRef.current.ondataavailable = (e) => {
        setChunks((prev) => [...prev, e.data]);
      };
      mediaRecorderRef.current.onstop = () => {
        // const blob = new Blob(chunks, { type: "audio/wav" });
        // const downloadUrl = URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = downloadUrl;
        // a.download = `recording_${new Date().toISOString()}.wav`;
        // a.click();
        // URL.revokeObjectURL(downloadUrl);
        // setChunks([]);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
      startTimer();
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
      setRecording(false);
      stopTimer();
      setTime(0);
    }
    if (onClose) onClose();
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
      <Typography textAlign="center">{formatTime(time)}</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={1}>
        {recording ? (
          <Styled.RecorderStopButton
            onClick={handleStopRecording}
            color="secondary"
          >
            <StopIcon sx={{ fontSize: 36 }} />
          </Styled.RecorderStopButton>
        ) : (
          <Styled.RecorderStartButton
            variant="contained"
            color="secondary"
            onClick={handleStartRecording}
          >
            <MicIcon sx={{ fontSize: 36 }} />
          </Styled.RecorderStartButton>
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
