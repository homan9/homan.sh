import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG-Q0Q-643X5kYIXaBoL0cjg96R_hZPPw",
  authDomain: "homan-56a4b.firebaseapp.com",
  projectId: "homan-56a4b",
  storageBucket: "homan-56a4b.firebasestorage.app",
  messagingSenderId: "966194013340",
  appId: "1:966194013340:web:17dda9ccb3779ef0287959",
  measurementId: "G-G2TH1RSMVP",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
