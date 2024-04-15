import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { AddUserType } from "../admin/user/AddUserForm.types";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHook";
import { clearTeacher, setTeacher } from "@/libs/adminSlice";
import toast from "react-hot-toast";

const useLoginForm = () => {
  const navigate = useNavigate();
  // const [keepLogin, setKeepLogin] = useState(true);
  const isTeacher = useAppSelector((state) => state.admin.teacher);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<AddUserType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onClickSwitch = () => {
    // setKeepLogin((prev) => !prev);
    if (isTeacher) dispatch(clearTeacher());
    else dispatch(setTeacher());
  };

  const onSubmit = handleSubmit(async (data: AddUserType) => {
    const salt = process.env.SOME_CODE;
    const newUsername = data.username + "@email.com";
    const newPassword = `${data.password}${salt}`;

    // 로그인 작업
    try {
      if (!isTeacher) {
        await signInWithEmailAndPassword(auth, newUsername, newPassword);
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, data.username, data.password);
        navigate("/admin");
      }
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email")
          toast.error("아이디 혹은 비밀번호가 다릅니다.");
        else toast.error("로그인중 알 수 없는 에러가 발생했습니다.");
      }
    }
  });

  return {
    control,
    errors,
    isTeacher,
    onClickSwitch,
    onSubmit,
  };
};

export default useLoginForm;
