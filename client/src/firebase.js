// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "jankalyan-f1fa7.firebaseapp.com",
  projectId: "jankalyan-f1fa7",
  storageBucket: "jankalyan-f1fa7.appspot.com",
  messagingSenderId: "642894155632",
  appId: "1:642894155632:web:eba9a532d65b45a49bc9b5",
  measurementId: "G-C2J9T2H1W0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;