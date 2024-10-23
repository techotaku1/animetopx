import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYnAtrnCbwWiojKOsepuSl5BZOlLmbfKI",
  authDomain: "animetopx-e843a.firebaseapp.com",
  projectId: "animetopx-e843a",
  storageBucket: "animetopx-e843a.appspot.com",
  messagingSenderId: "894043607997",
  appId: "1:894043607997:web:a3543fd41e9b1638c7f8d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };