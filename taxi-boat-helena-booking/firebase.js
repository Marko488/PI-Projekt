// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVKEk6Tz3nhDEpwNTwN6Qd5aDOct2FSGM",
  authDomain: "taxi-boat-helena-booking.firebaseapp.com",
  projectId: "taxi-boat-helena-booking",
  storageBucket: "taxi-boat-helena-booking.appspot.com",
  messagingSenderId: "476887855675",
  appId: "1:476887855675:web:c220300d9ff8baa1da221e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth };
