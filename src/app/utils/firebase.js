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
console.log(process.env.FIREBASE_API_KEY);
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
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { auth, db };
