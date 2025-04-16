import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEdgWJawAwUl9qki1vk9WSJgceeUnMSCc",
  authDomain: "mini-library-8cfe7.firebaseapp.com",
  projectId: "mini-library-8cfe7",
  storageBucket: "mini-library-8cfe7.firebasestorage.app",
  messagingSenderId: "173188934794",
  appId: "1:173188934794:web:0c7df3da1b056dc3e3d173",
  measurementId: "G-BSGXMPTY96"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
