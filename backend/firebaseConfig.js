// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxSaCCrVDwvrRRXiOBkCwek3gTsFQZu3Q",
  authDomain: "venushacks2025-b1cc0.firebaseapp.com",
  projectId: "venushacks2025-b1cc0",
  storageBucket: "venushacks2025-b1cc0.firebasestorage.app",
  messagingSenderId: "377250989488",
  appId: "1:377250989488:web:40b54341aedb7809738275",
  measurementId: "G-E5Y6DEVE6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };