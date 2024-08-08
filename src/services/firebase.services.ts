// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhrogrf9Qd9Ntrm3-yNE-yR-pQYI_P04",
  authDomain: "astromaniaka.firebaseapp.com",
  projectId: "astromaniaka",
  storageBucket: "astromaniaka.appspot.com",
  messagingSenderId: "315989182078",
  appId: "1:315989182078:web:b7c590cb53cfa32052fa2f",
  measurementId: "G-0NQH1SJ0DX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
