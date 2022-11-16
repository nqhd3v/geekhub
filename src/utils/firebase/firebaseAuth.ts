import { FirebaseError } from "firebase/app";
import { ActionCodeInfo, applyActionCode, checkActionCode, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, verifyPasswordResetCode } from "firebase/auth"
import { firebaseAuth } from "./firebase";

// TYPE & INTERFACE

export type FIREBASE_EMAIL_ACTION_MODE = "resetPassword" | "recoveryEmail" | "verifyEmail";

// MAPPING
export const FIREBASE_EMAIL_ACTION_MODES: FIREBASE_EMAIL_ACTION_MODE[] = ["recoveryEmail", "resetPassword", "verifyEmail"];
export const FIREBASE_EMAIL_ACTION_MODE_MAPPING: {[key: string]: FIREBASE_EMAIL_ACTION_MODE} = {
  RESET_PASSWORD: 'resetPassword',
  RECOVERY_EMAIL: 'recoveryEmail',
  VERIFY_EMAIL: 'verifyEmail',
}
export const ERROR_MSG_MAPPING: {[key: string]: string} = {
  'auth/user-not-found': 'Email khum đúng ời!',
  'auth/wrong-password': 'Mật khẩu sai ời',
}

// FUNCS

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
export const logout = async () => {
  try {
    return await signOut(firebaseAuth);
  } catch (err) {
    throw err;
  }
}

export const applyCode = async (code: string): Promise<void> => applyActionCode(firebaseAuth, code);
export const checkCode = async (code: string): Promise<ActionCodeInfo> => checkActionCode(firebaseAuth, code);
export const verifyPwdResetCode = async (code: string): Promise<string> => verifyPasswordResetCode(firebaseAuth, code);