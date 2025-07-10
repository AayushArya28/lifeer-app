// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDI9V52gZ-Xto28ew5S0jHzaqnr8NWMGRE",
  authDomain: "lifemanagementapp-2d8e3.firebaseapp.com",
  projectId: "lifemanagementapp-2d8e3",
  storageBucket: "lifemanagementapp-2d8e3.firebasestorage.app",
  messagingSenderId: "235054355388",
  appId: "1:235054355388:web:e7df70526baa11a94551b9",
  measurementId: "G-XTFZY72E0J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
