import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export const guardarHabitosEnFirestore = async (datos: Record<string, any>) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('No se encontró un usuario autenticado.');

  const docRef = doc(db, 'usuarios', user.uid, 'habitos', 'formulario');
  await setDoc(docRef, {
    ...datos,
    timestamp: new Date().toISOString()
  }, { merge: true });
};