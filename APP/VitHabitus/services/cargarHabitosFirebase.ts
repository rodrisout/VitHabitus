import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export const cargarHabitosDesdeFirestore = async (): Promise<Record<string, any>> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error('Usuario no autenticado.');

  const docRef = doc(db, 'usuarios', user.uid, 'habitos', 'formulario');
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('No se encontraron hábitos guardados.');
  }

  const datos = docSnap.data();
  delete datos.timestamp; 
  return datos;
};