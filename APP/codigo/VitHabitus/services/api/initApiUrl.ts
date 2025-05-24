import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Constants from 'expo-constants';

let apiUrl: string | null = null;

export const loadApiUrl = async () => {
  try {
    const snap = await getDoc(doc(db, 'config', 'api'));
    if (snap.exists()) {
      apiUrl = snap.data().url;
    } else {
      apiUrl = Constants.expoConfig?.extra?.apiUrl || '';
    }
  } catch (e) {
    console.warn('Fallo obteniendo la API desde Firestore, usando .env', e);
    apiUrl = Constants.expoConfig?.extra?.apiUrl || '';
  }
};

export const getApiUrl = () => apiUrl;