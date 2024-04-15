import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { useAppSelector } from "./useReduxHook";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";

const messaging = getMessaging();

const requestPermission = async (uid: string | null) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.VAPID_KEY,
      });
      if (currentToken && uid !== null) {
        // 토큰은 서버로 전송
        const teacherRef = doc(db, "teacher", uid);
        await updateDoc(teacherRef, {
          tokens: arrayUnion(currentToken),
        });
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

async function useRequestPermission() {
  const uid = useAppSelector((state) => state.user.uid);

  useEffect(() => {
    requestPermission(uid);
  }, [uid]);
}

export default useRequestPermission;
