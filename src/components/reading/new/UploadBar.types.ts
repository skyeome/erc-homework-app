import { chunks, setChunks } from "@/components/record/Recorder.types";

export interface UploadBarProps {
  isUploading: boolean;
  isActive?: boolean;
  chunks: chunks;
  setChunks: setChunks;
  handleUpload: (e: React.MouseEvent<HTMLElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleReset: VoidFunction;
  onlyPicture?: boolean;
}
