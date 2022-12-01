// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuuWkhBpVo14IFQFzkDkImVCsnTO0VF38",
  authDomain: "chat-poi-1ca86.firebaseapp.com",
  projectId: "chat-poi-1ca86",
  storageBucket: "chat-poi-1ca86.appspot.com",
  messagingSenderId: "215164228856",
  appId: "1:215164228856:web:2cf02c5c5ef8cc4fb3d70d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();