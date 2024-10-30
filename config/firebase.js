// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA66D-FBsA9pys1L2iZkRYsWs8YPNhj4s0",
  authDomain: "custom-project-d4ba9.firebaseapp.com",
  projectId: "custom-project-d4ba9",
  storageBucket: "custom-project-d4ba9.appspot.com",
  messagingSenderId: "244889113057",
  appId: "1:244889113057:web:cd4f53bcbfd2b7e7aec2a0",
  measurementId: "G-17FJL57ZRV"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const db = getFirestore(App);