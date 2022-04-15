import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_vedWM8p0l-aJokKQoDCMROHIu6QtjnA",
  authDomain: "pharmaceutical-website.firebaseapp.com",
  projectId: "pharmaceutical-website",
  storageBucket: "pharmaceutical-website.appspot.com",
  messagingSenderId: "995170560899",
  appId: "1:995170560899:web:44da344b5cc6717f5ee4b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app