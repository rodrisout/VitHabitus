// services/checkEmailVerification.ts
import { auth } from './firebaseConfig';

export const checkEmailVerified = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.warn('No hay usuario logueado');
      return false;
    }

    await user.reload(); 

    return user.emailVerified; 
  } catch (error) {
    console.error('Error al comprobar verificación de email:', error);
    return false;
  }
};
