import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    storageBucket: process.env.FIREBASE_BUCKET
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
