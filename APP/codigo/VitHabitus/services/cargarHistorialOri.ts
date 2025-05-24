import { auth, db } from './firebaseConfig';
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore';

export async function obtenerUltimosORI(limitCount: number = 2) {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');

  const ref = collection(db, 'usuarios', user.uid, 'habitos', 'valor', 'oriHistorial');
  const q = query(ref, orderBy('fecha', 'desc'), limit(limitCount));

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as {
    id: string;
    fecha: any;
    ori: number;
    cambios: { antes: Record<string, string>; despues: Record<string, string> };
  }[];
}