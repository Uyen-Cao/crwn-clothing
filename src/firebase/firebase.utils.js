import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyDJuXyf2EhfMtv7rmY0wqqYVFyTdAF0W3Y",
  authDomain: "crwn-db-486e4.firebaseapp.com",
  projectId: "crwn-db-486e4",
  storageBucket: "crwn-db-486e4.appspot.com",
  messagingSenderId: "959929507089",
  appId: "1:959929507089:web:4d4173915ad196eae7c0b0",
  measurementId: "G-26KV6T0J2W",
};

firebase.initializeApp(config);

//Google authentication credentials

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
