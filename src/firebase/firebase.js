// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGdoRKOELA67zNVDIo9oR4Efh-007Fdqk",
  authDomain: "pfform-14fd0.firebaseapp.com",
  projectId: "pfform-14fd0",
  storageBucket: "pfform-14fd0.appspot.com",
  messagingSenderId: "843555241613",
  appId: "1:843555241613:web:d0eaa8e04f923a653facc4",
  measurementId: "G-S6SJJXQ4TF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
