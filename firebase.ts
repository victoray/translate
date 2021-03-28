import firebase from "firebase";
import "firebase/firestore";
// import "firebase/auth";
import { FIREBASE_APP } from "./constants/Firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRZyzfFM95EMWFrLcLR2kMuuMv6SuoWCw",
  authDomain: "translate-2e09f.firebaseapp.com",
  databaseURL: "https://calculator-f137a.firebaseio.com",
  projectId: "translate-2e09f",
  storageBucket: "translate-2e09f.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig, FIREBASE_APP);
} else {
  firebase.app(FIREBASE_APP);
}
