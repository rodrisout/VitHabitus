import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdeJdobY7GFp_cRsy2yFR54CECGtE5558",
  authDomain: "vithabitus.firebaseapp.com",
  projectId: "vithabitus",
  messagingSenderId: "517135163757",
  appId: "1:517135163757:web:050c75d0083dd3db9fba64",
  measurementId: "G-91D6ZNG6BM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
