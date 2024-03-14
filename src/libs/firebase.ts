import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.PROD
    ? import.meta.env.FB_API_KEY
    : import.meta.env.VITE_FB_API_KEY,
  authDomain: "erc-homework.firebaseapp.com",
  projectId: "erc-homework",
  storageBucket: "erc-homework.appspot.com",
  messagingSenderId: import.meta.env.PROD
    ? import.meta.env.FB_SENDER_ID
    : import.meta.env.VITE_FB_SENDER_ID,
  appId: import.meta.env.PROD
    ? import.meta.env.FB_APP_ID
    : import.meta.env.VITE_FB_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
