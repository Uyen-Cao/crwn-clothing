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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

//Google authentication credentials

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
