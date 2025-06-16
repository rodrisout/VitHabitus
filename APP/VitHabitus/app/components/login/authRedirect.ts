import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { router } from 'expo-router';

export default function useAuthRedirect() {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login'); // Redirige si no hay sesión
      }
    });

    return () => unsubscribe();
  }, []);
}
