import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/libs/firebase";

export default function useAuthChange() {
  const userJSON = localStorage.getItem("user");
  const [user, setUser] = useState(userJSON);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const userCopy = {
          uid: user.uid,
          email: user.email,
        };
        const userStr = JSON.stringify(userCopy);
        setUser(userStr);
        localStorage.setItem("user", userStr);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [userJSON]);

  const handleLogout = (): void => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return { user, handleLogout };
}
