import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { collection, CollectionReference, doc, DocumentData, DocumentReference, getFirestore } from 'firebase/firestore';

const {
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_PRJ_ID,
  REACT_APP_GOOGLE_APP_ID,
  REACT_APP_GOOGLE_AUTH_DOMAIN,
  REACT_APP_GOOGLE_STORAGE_BUCKET,
  REACT_APP_GOOGLE_MSG_SENDER_ID,
} = process.env;

const config = {
  apiKey: REACT_APP_GOOGLE_API_KEY,
  projectId: REACT_APP_GOOGLE_PRJ_ID,
  appId: REACT_APP_GOOGLE_APP_ID,
  authDomain: REACT_APP_GOOGLE_AUTH_DOMAIN,
  storageBucket: REACT_APP_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_GOOGLE_MSG_SENDER_ID,
}

const firebaseApp = initializeApp(config);

// Firebase - Authenticate
export const firebaseAuth = getAuth(firebaseApp);
// Firebase - Firestore
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseDoc = (path: string, ...pathSegments: string[]): DocumentReference<DocumentData> => doc(firebaseFirestore, path, ...pathSegments);
export const firebaseColl = (path: string, ...pathSegments: string[]): CollectionReference<DocumentData> => collection(firebaseFirestore, path, ...pathSegments);

export default firebaseApp;