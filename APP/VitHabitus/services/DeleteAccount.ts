import { deleteUser } from 'firebase/auth';
import { auth, db } from './firebaseConfig'; // Asegúrate de exportar `db` en tu config
import { clearSession } from './Session';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export const deleteUserAndData = async () => {
  const user = auth.currentUser;

  if (!user) throw new Error('No hay usuario logueado');

  const uid = user.uid;

  // Subcolecciones a borrar
  const subcollections = ['notas', 'habitos'];

  // Borrar documentos de subcolecciones
  for (const sub of subcollections) {
    const ref = collection(db, `usuarios/${uid}/${sub}`);
    const snapshot = await getDocs(ref);
    for (const d of snapshot.docs) {
      await deleteDoc(d.ref);
    }
  }

  // Borrar documento principal del usuario
  await deleteDoc(doc(db, 'usuarios', uid));

  // Borrar usuario
  await deleteUser(user);

  // Limpiar sesión y redirigir
  await clearSession();
};