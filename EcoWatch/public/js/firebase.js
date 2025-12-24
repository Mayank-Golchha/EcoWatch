// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYdvjYpkXPl-IR_dgeD0-aUdaGWSRzO6E",
  authDomain: "project-948ca.firebaseapp.com",
  projectId: "project-948ca",
  storageBucket: "project-948ca.firebasestorage.app",
  messagingSenderId: "928488170058",
  appId: "1:928488170058:web:07f715bb7ace3bf1343cb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Export for use in other files
export const db = getFirestore(app);
export const auth = getAuth(app);