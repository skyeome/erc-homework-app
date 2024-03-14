export interface UploadBarProps {
  isActive?: boolean;
  handleUpload: (e: React.MouseEvent<HTMLElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleReset: VoidFunction;
  onlyPicture?: boolean;
}
