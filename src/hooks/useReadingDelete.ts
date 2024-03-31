import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./useReduxHook";
import { getReadingBooks } from "@/api/reading";
import useModal from "./useModal";

const useReadingDelete = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const { uid } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["reading", "detail", title?.slice(0, 16)],
    queryFn: () => getReadingBooks(uid, title),
  });
  const [deleteItems, setDeleteItems] = useState<string[]>([]);
  const { open, handleOpen, handleClose } = useModal();

  const topTitle =
    title !== undefined && title.length > 16
      ? title.slice(0, 16) + "..."
      : title;

  const handleDelete = async () => {
    setDeleteItems([]);
    handleClose();
    navigate(-1);
  };

  return {
    title: topTitle,
    data,
    deleteItems,
    setDeleteItems,
    open,
    handleOpen,
    handleClose,
    handleDelete,
  };
};

export default useReadingDelete;
