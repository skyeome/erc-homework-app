import { FormEvent, useRef, useState } from "react";
import useRecordUpload from "./useRecordUpload";

function useUpload(type: string, image?: string) {
  const input = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>();
  const [chunks, setChunks] = useState<Blob[]>([]);

  // 녹음 관련
  const {
    isSupport,
    downloadUrl,
    handleSubmit: handleRecordSubmit,
  } = useRecordUpload({ type, chunks, setChunks });

  // handle Click
  const handleUpload = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (input.current) input.current.click();
  };

  // handle file change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드한 파일들이 있을 때
    if (e.target.files) {
      const urls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImages((prev) => {
        if (!prev) return urls;
        return [...prev, ...urls];
      });
    }
    // 파일 초기화!
    if (input.current) input.current.value = "";
  };

  // handle reset
  const handleReset = () => {
    setImages(undefined);
    setChunks([]);
    // 파일 초기화!
    if (input.current) input.current.value = "";
  };

  // 업로드 로직
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      console.log("책검색 통한 업로드...");
    }
    console.log(type);
    handleRecordSubmit();
  };

  return {
    input,
    images,
    chunks,
    setChunks,
    handleUpload,
    handleChange,
    handleReset,
    handleSubmit, // 이미지 관련
    isSupport,
    downloadUrl, // 녹음 관련
  };
}

export default useUpload;
