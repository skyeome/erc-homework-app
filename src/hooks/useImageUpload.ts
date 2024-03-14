import { useRef, useState } from "react";

function useImageUpload() {
  const input = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>();

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
    // 파일 초기화!
    if (input.current) input.current.value = "";
  };

  return { input, images, handleUpload, handleChange, handleReset };
}

export default useImageUpload;
