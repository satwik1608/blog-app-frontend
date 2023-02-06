// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK5g_brRMrMTnxYP-Nx9bJgFYuSkGQ5Io",
  authDomain: "image-uploader-9d58d.firebaseapp.com",
  projectId: "image-uploader-9d58d",
  storageBucket: "image-uploader-9d58d.appspot.com",
  messagingSenderId: "553981714695",
  appId: "1:553981714695:web:5568c4f219a1bdef0c65a2",
  measurementId: "G-50XQLMYXME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { app, db, analytics, firebaseConfig, storage };
