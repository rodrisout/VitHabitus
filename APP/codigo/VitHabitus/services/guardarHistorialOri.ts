import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

interface ORIHistorialEntry {
  fecha: Date;
  ori: number;
  cambios: {
    antes: Record<string, string>;
    despues: Record<string, string>;
  };
}

export const guardarORIHistorial = async (entrada: ORIHistorialEntry) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');

  const ref = collection(db, 'usuarios', user.uid, 'habitos', 'valor', 'oriHistorial');
  await addDoc(ref, {
    fecha: Timestamp.fromDate(entrada.fecha),
    ori: entrada.ori,
    cambios: entrada.cambios,
  });
};