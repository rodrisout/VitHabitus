import { auth } from '../firebaseConfig';

//para la url del la API
export const getAuthHeaderApi = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.warn('No hay usuario logueado');
        return;
    }

    const token = await user.getIdToken();

    return {
        Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    };
};
