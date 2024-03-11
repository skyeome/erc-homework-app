type chunks = Blob[];
type setChunks = React.Dispatch<React.SetStateAction<Blob[]>>;

export interface RecorderProps {
  setChunks: setChunks;
}

export interface RecordCompleteProps {
  chunks: chunks;
  setChunks: setChunks;
}
