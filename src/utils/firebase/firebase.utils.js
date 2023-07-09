import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCVj1puuMJA09l8ECyyyLJruA2oHSUqBFk",
  authDomain: "crwn-clothing-db-15ba8.firebaseapp.com",
  projectId: "crwn-clothing-db-15ba8",
  storageBucket: "crwn-clothing-db-15ba8.appspot.com",
  messagingSenderId: "1037365022710",
  appId: "1:1037365022710:web:ed7a01ea8a45b208d881d7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//gives instance of google Auth provider
const provider = new GoogleAuthProvider();
// gives different ways googleAuth provider should behave
provider.setCustomParameters({
  prompt: "select_account",
});

//there can be multiple providers instances used in diff situations
// there can be FB provider, apple...
// only one auth service
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

// takes the user info from authentication and passes to fireStore db to store as document
export const createUserDocumentFromAuth = async (userAuth) => {
  // creates a reference to the user document
    //Firebase allows you to create a document reference even if the specified collection does not exist yet.
  const userDocRef = doc(db, 'users', userAuth.uid);
  // doc takes in teh database, collection and id to check if user exists
  // Gets the document data
  const userSnapshot = await getDoc(userDocRef);
  // checks if the user exists within the database
  if(!userSnapshot.exists()) {
    console.log('got Here')
    const {displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      // to create a doc need to send the doc ref
          //and data you want to set with it
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error) {
      console.log('Error creating the user', error);
    }
  }
  return userDocRef;
};
