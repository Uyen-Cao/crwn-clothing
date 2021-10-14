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

//QueryReference and QuerySnapshot

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //send the user signed in to the database
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //get the data from the database which have the same id
  const snapShot = await userRef.get();

  //if the user signed in is not existed in the database -> create a new one
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
  //this function would be imported by the app.js for getting user
};

firebase.initializeApp(config);

//Google authentication credentials

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
