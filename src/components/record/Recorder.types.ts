export type chunks = Blob[];
export type setChunks = React.Dispatch<React.SetStateAction<Blob[]>>;

export interface RecorderProps {
  setChunks: setChunks;
  onClose?: VoidFunction;
}

export interface RecordCompleteProps {
  chunks: chunks;
  setChunks: setChunks;
}
