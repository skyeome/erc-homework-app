import { FormEvent, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import { format } from "date-fns";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import useRecordUpload from "./useRecordUpload";
import { useAppSelector } from "./useReduxHook";
import { ImageAndRecordProps, uploadImageAndRecord } from "@/api/record";

export interface ImagesInfo {
  imageRef: string;
  imageUrl: string;
}

const options = {
  maxSizeMB: 1, // 허용하는 최대 사이즈 지정
  maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
  initialQuality: 0.6,
};

function useUpload(type: string, image?: string, title?: string) {
  const user = useAppSelector((state) => state.user);
  const input = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<string[]>();
  const [imgFiles, setImgFiles] = useState<Blob[]>([]);
  const [chunks, setChunks] = useState<Blob[]>([]);

  // 녹음 관련
  const { isSupport, downloadUrl, handleRecordUpload } = useRecordUpload({
    type,
    chunks,
    setChunks,
  });

  // handle Click
  const handleUpload = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (input.current) input.current.click();
  };

  // handle file change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 업로드한 파일들이 있을 때
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) =>
        imageCompression(file, options)
      );
      const compressedImages = await Promise.all(files);
      const urls = compressedImages.map((file) => URL.createObjectURL(file));

      setImgFiles(compressedImages);
      setImages((prev) => {
        if (!prev) return urls;
        return [...prev, ...urls];
      });
    }
    // 파일 초기화!
    if (input.current) input.current.value = "";
  };

  const upload = async (file: Blob, index: number) => {
    const now = new Date();
    const dateStr = format(now, "yyyy-MM-dd");
    const timeStr = format(now, "HH:mm:ss");
    const imageRef = `${type}/${user.uid}/${dateStr}/${
      user.name + "_" + timeStr
    }-image${index}`;
    const fileRef = ref(storage, imageRef);

    // 파일 업로드 및 다운로드 url 생성
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);

    return {
      imageRef,
      imageUrl,
    };
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
    setIsUploading(true);
    const uploadPromises = imgFiles.map((file, index) => upload(file, index));
    try {
      const results = await Promise.all(uploadPromises);
      const record = await handleRecordUpload();
      // firestore에 저장할 data
      const storeData: ImageAndRecordProps = {
        type,
        uid: user.uid ?? "",
        name: user.name ?? "",
        createdAt: new Date(),
        title,
        thumb: image,
        images: results,
        record,
      };

      if (image) storeData.thumb = image;
      if (title) storeData.title = title;
      if (results.length > 0) storeData.images = results;
      if (record) storeData.record = record;

      await uploadImageAndRecord(storeData);
      toast.success("숙제가 정상적으로 업로드 되었습니다.");
      handleReset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code, error.message);
        toast.error("업로드 과정에서 문제가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
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
