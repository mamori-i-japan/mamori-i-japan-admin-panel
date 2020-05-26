// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';
// Add the Firebase products that you want to use
import 'firebase/auth';
import { langCode } from '../constants';

let firebaseConfig;

// add PRD & STG env
if (process.env.REACT_APP_ENV === 'prd') {
  firebaseConfig = {};
} else if (process.env.REACT_APP_ENV === 'stg') {
  firebaseConfig = {};
} else {
  // replace these values to your firebase project's one
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();

auth.languageCode = langCode;

const redirectHost =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : process.env.REACT_APP_HOST;

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: `${redirectHost}login`,
  // This must be true.
  handleCodeInApp: true,
};

export { auth, actionCodeSettings };
