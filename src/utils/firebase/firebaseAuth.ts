import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "./firebase"

export const ERROR_MSG_MAPPING: {[key: string]: string} = {
  'auth/user-not-found': 'Email không chính xác!',
  'auth/wrong-password': 'Mật khẩu không chính xác',
}

export const loginWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (err: any) {
    if (err instanceof FirebaseError) {
      // console.error(err.code);
      throw new Error(ERROR_MSG_MAPPING[err.code]);
    }
    throw err;
  }
}
export const forgotPassword = async (email: string) => {
  try {
    return await sendPasswordResetEmail(firebaseAuth, email);
  } catch (err: any) {
    if (err instanceof FirebaseError) {
      throw new Error(ERROR_MSG_MAPPING[err.code]);
    }
    throw err;
  }
}