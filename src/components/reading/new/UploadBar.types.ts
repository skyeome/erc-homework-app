export interface UploadBarProps {
  isActive?: boolean;
  setChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
  handleUpload: (e: React.MouseEvent<HTMLElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleReset: VoidFunction;
  onlyPicture?: boolean;
}
