import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useReduxHook";
import { deleteReadingBooks, getReadingBooks } from "@/api/reading";
import useModal from "./useModal";
import { Reading } from "@/libs/firestore";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

const useReadingDelete = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const book = state as Reading;
  const { title } = useParams();
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["reading", "detail", title?.slice(0, 16)],
    queryFn: () => getReadingBooks(uid, title),
  });
  const [deleteItems, setDeleteItems] = useState<string[]>([]);
  const { open, handleOpen, handleClose } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const delReadings = deleteItems.map((item) =>
      data?.find((book) => book.id === item)
    );
    try {
      await deleteReadingBooks(uid, delReadings);
      setDeleteItems([]);
      navigate(-1);
      toast.success("삭제가 완료되었습니다.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code, error.message);
        toast.error("삭제중 에러가 발생했습니다.");
      }
    } finally {
      setIsDeleting(false);
      handleClose();
    }
  };

  return {
    data,
    book,
    deleteItems,
    setDeleteItems,
    isDeleting,
    open,
    handleOpen,
    handleClose,
    handleDelete,
  };
};

export default useReadingDelete;
