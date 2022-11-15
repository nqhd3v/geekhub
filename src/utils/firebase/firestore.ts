import { addDoc, deleteDoc, DocumentData, getDoc, getDocs, query, QueryConstraint, QuerySnapshot, setDoc, WithFieldValue, Timestamp } from "firebase/firestore";
import { firebaseColl, firebaseDoc } from "./firebase";

// Firestore - Timestamp utils
export const toFsTimestamp = (date?: Date) => Timestamp.fromDate(date || new Date());

// Firestore - Add document
export const fsAdd = async (
  data: WithFieldValue<DocumentData>,
  path: string,
  ...pathSegments: string[]
): Promise<DocumentData | Error> => {
  try {
    const docRef = await addDoc(firebaseColl(path, ...pathSegments), data);
    return await fsReadOne(path, ...[...pathSegments, docRef.id]);
  } catch (err) {
    throw err;
  }
}

const transformData = (querySnapshot: QuerySnapshot<DocumentData>): DocumentData => {
  const data: DocumentData = {};
  querySnapshot.forEach(snap => {
    data[snap.id] = {
      ...snap.data(),
      _id: snap.id,
    };
  });
  return data;
}

// Firestore - Read documents
export const fsRead = async (
  path: string,
  ...pathSegments: string[]
): Promise<DocumentData | Error> => {
  try {
    const querySnapshot = await getDocs(firebaseColl(path, ...pathSegments));
    return transformData(querySnapshot);
  } catch (err) {
    throw err;
  }
};

export const fsReadWithCond = async (
  queries: QueryConstraint[],
  path: string,
  ...pathSegments: string[]
): Promise<DocumentData | Error> => {
  try {
    const q = query(firebaseColl(path, ...pathSegments), ...queries);
    const querySnapshot = await getDocs(q);
    return transformData(querySnapshot);
  } catch (err) {
    throw err;
  }
}


export const fsReadOne = async (
  path: string,
  ...pathSegments: string[]
): Promise<DocumentData | Error> => {
  try {
    const docSnapshot = await getDoc(firebaseDoc(path, ...pathSegments));
    return {
      ...docSnapshot.data(),
      _id: docSnapshot.id,
    };
  } catch (err) {
    throw err;
  }
};

// Firestore - update document
export const fsUpdate = async (
  data: DocumentData,
  path: string,
  ...pathSegments: string[]
): Promise<DocumentData | Error> => {
  try {
    await setDoc(firebaseDoc(path, ...pathSegments), data, {
      merge: true,
    });
    return await fsReadOne(path, ...pathSegments);
  } catch (err) {
    throw err;
  }
}

export const fsRemove = async (
  path: string,
  ...pathSegments: string[]
): Promise<boolean | Error> => {
  try {
    await deleteDoc(firebaseDoc(path, ...pathSegments));
    return true;
  } catch (err) {
    throw err;
  }
}