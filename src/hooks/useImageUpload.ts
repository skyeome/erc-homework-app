import { FormEvent, useRef, useState } from "react";

function useImageUpload(type: string, image?: string) {
  const input = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>();
  const [chunks, setChunks] = useState<Blob[]>([]);

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
  };

  return {
    input,
    images,
    chunks,
    setChunks,
    handleUpload,
    handleChange,
    handleReset,
    handleSubmit,
  };
}

export default useImageUpload;
