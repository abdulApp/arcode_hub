import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA85SsrTfIH8P4lOl3P-NBJ6pyBE5Wgn8Y",
  authDomain: "leetcode-d9ffb.firebaseapp.com",
  projectId: "leetcode-d9ffb",
  storageBucket: "leetcode-d9ffb.appspot.com",
  messagingSenderId: "751081271643",
  appId: "1:751081271643:web:9d3bd156ef6f910fb66a7e",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
