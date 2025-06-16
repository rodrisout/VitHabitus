import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Referencia a Firestore
const db = getFirestore();
const auth = getAuth();

// Crea una nueva nota
export const createNota = async (titulo: string, contenido: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const nota = {
    titulo: titulo.slice(0, 110),
    contenido,
    fechaCreacion: serverTimestamp(),
    fechaActualizacion: serverTimestamp(),
  };

  await addDoc(collection(db, "usuarios", user.uid, "notas"), nota);
};

// Obtiene todas las notas del usuario ordenadas por fecha de creación
export const getNotas = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const querySnapshot = await getDocs(collection(db, "usuarios", user.uid, "notas"));

  const notas = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Ordenar por fechaCreacion descendente (más nuevas primero)
  return notas.sort((a: any, b: any) => b.fechaCreacion?.seconds - a.fechaCreacion?.seconds);
};

// Actualiza una nota por su ID
export const updateNota = async (notaId: string, campos: { titulo?: string, contenido?: string }) => {
  const user = auth.currentUser;
  if (!user) return;

  const notaRef = doc(db, "usuarios", user.uid, "notas", notaId);
  await updateDoc(notaRef, {
    ...campos,
    fechaActualizacion: serverTimestamp(),
  });
};

// Borra una nota por su ID
export const deleteNota = async (notaId: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const notaRef = doc(db, "usuarios", user.uid, "notas", notaId);
  await deleteDoc(notaRef);
};