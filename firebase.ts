// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhR-zp_eMbt7QA6WaV5f7a17owdHO32bk",
  authDomain: "kanekt-a28c4.firebaseapp.com",
  projectId: "kanekt-a28c4",
  storageBucket: "kanekt-a28c4.appspot.com",
  messagingSenderId: "509244621881",
  appId: "1:509244621881:web:98194258c9c622c8efb9e8",
  measurementId: "G-6QF2EJSBJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

// // Import the functions you need from the SDKs you need
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBhR-zp_eMbt7QA6WaV5f7a17owdHO32bk",
//   authDomain: "kanekt-a28c4.firebaseapp.com",
//   projectId: "kanekt-a28c4",
//   storageBucket: "kanekt-a28c4.appspot.com",
//   messagingSenderId: "509244621881",
//   appId: "1:509244621881:web:98194258c9c622c8efb9e8",
//   measurementId: "G-6QF2EJSBJR"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = getAuth();
// const analytics = getAnalytics(app);

// export { auth };
