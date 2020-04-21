// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: should change based on ENV
const firebaseConfig = {
  apiKey: "AIzaSyBbg2NNhLmY8YRSFmjibDoDM7O1EgheNEI",
  authDomain: "contact-tracing-26716.firebaseapp.com",
  databaseURL: "https://contact-tracing-26716.firebaseio.com",
  projectId: "contact-tracing-26716",
  storageBucket: "contact-tracing-26716.appspot.com",
  messagingSenderId: "776506470916",
  appId: "1:776506470916:web:247cbad6ea82c2010bfb51",
  measurementId: "G-H7GJ1Y3F0D"
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = firebase.auth();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'http://localhost:3000/login',
  // This must be true.
  handleCodeInApp: true
};

export { firebase, auth, actionCodeSettings };
