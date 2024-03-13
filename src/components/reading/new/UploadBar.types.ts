export interface UploadBarProps {
  handleUpload: (e: React.MouseEvent<HTMLElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onlyPicture?: boolean;
}
