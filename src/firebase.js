// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmh9gN4--pHBj1hYwPGs-gavlqoiJVPOA",
  authDomain: "hero-hunter---cyberpunk.firebaseapp.com",
  projectId: "hero-hunter---cyberpunk",
  storageBucket: "hero-hunter---cyberpunk.appspot.com",
  messagingSenderId: "799158150569",
  appId: "1:799158150569:web:b01d459dda9586817510b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)