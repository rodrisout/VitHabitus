import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
export const resetPassword = async (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};
