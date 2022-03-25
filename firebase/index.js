// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsPUnd0Gy3tmstNdZ-Q6Hro5SeNCx2FeA",
  authDomain: "modern-react-app-b5454.firebaseapp.com",
  projectId: "modern-react-app-b5454",
  storageBucket: "modern-react-app-b5454.appspot.com",
  messagingSenderId: "58268936893",
  appId: "1:58268936893:web:3a1afa5dfede664edee5d4",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

export { db, storage };
