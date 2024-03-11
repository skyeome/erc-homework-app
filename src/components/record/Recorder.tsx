import React, { useState, useRef } from "react";

const Recorder: React.FC = () => {
  const [recording, setRecording] = useState(false); // 현재 녹음 중인지
  const [time, setTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // 미디어 녹음기
  const chunksRef = useRef<Blob[]>([]);
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" });
        // const url = URL.createObjectURL(blob);
        // const audio = new Audio(url);
        // audio.play();
        const a = document.createElement("a");
        const downloadUrl = URL.createObjectURL(blob);
        a.href = downloadUrl;
        a.download = `recording_${new Date().toISOString()}.wav`;
        a.click();
        URL.revokeObjectURL(downloadUrl);
        chunksRef.current = [];
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
      <div>{formatTime(time)}</div>
      {recording ? (
        <button onClick={handleStopRecording} disabled={!recording}>
          Stop Recording
        </button>
      ) : (
        <button onClick={handleStartRecording} disabled={recording}>
          Start Recording
        </button>
      )}
    </div>
  );
};

export default Recorder;
