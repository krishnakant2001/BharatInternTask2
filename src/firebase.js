import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bharat-intern-task2.firebaseapp.com",
  projectId: "bharat-intern-task2",
  storageBucket: "bharat-intern-task2.appspot.com",
  messagingSenderId: "269096910567",
  appId: "1:269096910567:web:036a40a4178e20cb6eec42",
  measurementId: "G-XFGXSR2PEB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
