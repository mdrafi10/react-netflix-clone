// import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };
// console.log(process.env.FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: "AIzaSyCnINlTd5PMyOGVQGXseiS5kEswBdwIVHU",
  authDomain: "netflix-clone-yt-668ee.firebaseapp.com",
  projectId: "netflix-clone-yt-668ee",
  storageBucket: "netflix-clone-yt-668ee.appspot.com",
  messagingSenderId: "219552925972",
  appId: "1:219552925972:web:6bb9f65dee750ea4199a01",
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

// FIREBASE_API_KEY=AIzaSyCnINlTd5PMyOGVQGXseiS5kEswBdwIVHU
// FIREBASE_AUTH_DOMAIN="netflix-clone-yt-668ee.firebaseapp.com"
// FIREBASE_PROJECT_ID="netflix-clone-yt-668ee"
// FIREBASE_STORAGE_BUCKET="netflix-clone-yt-668ee.appspot.com"
// FIREBASE_MESSAGING_SENDER_ID="219552925972"
// FIREBASE_APP_ID="1:219552925972:web:6bb9f65dee750ea4199a01"

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
//   apiKey: 'AIzaSyBuu0YHXOcgmqWLZl-fiMn6lG2wUhdPg8k',
//   authDomain: 'next-firebase-stripe-39bf8.firebaseapp.com',
//   databaseURL: 'https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com',
//   projectId: 'next-firebase-stripe-39bf8',
//   storageBucket: 'next-firebase-stripe-39bf8.appspot.com',
//   messagingSenderId: '777709922250',
//   appId: '1:777709922250:web:4500ee09dca93e1406d133',
// }

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const db = getFirestore()
// const auth = getAuth()

// export default app
// export { auth, db }
