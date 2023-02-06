import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
// const app = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const app = firebase.app();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default app;
export { auth, db };

// ###############################################################################################
// firebase v9

// Import the functions you need from the SDKs you need
// import { initializeApp, getApp, getApps } from 'firebase/app'
// import { getFirestore } from 'firebase/firestore'
// import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// ...firebaseConfig
// }

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const db = getFirestore()
// const auth = getAuth()

// export default app
// export { auth, db }
