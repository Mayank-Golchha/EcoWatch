import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "APNA FIREBASE KA API",
  authDomain: "APNA FIREBASE KA PROJECT KA DOMAIN",
  projectId: "APNA FIREBASE KA PROJECT KA NAAM",
  storageBucket: "APNA_FIREBASE_KA_PROJECT_KA_NAAM.firebasestorage.app",
  messagingSenderId: "928488170058",
  appId: "1:928488170058:web:07f715bb7ace3bf1343cb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  Export for use in other files
export const db = getFirestore(app);

export const auth = getAuth(app);

