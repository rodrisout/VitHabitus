import {auth} from "./firebaseConfig";  
import Constants from "expo-constants";

export const verifyWithApi = async () => {

  const user = auth.currentUser;

  if (!user) {
    console.warn("No hay usuario logueado");
    return;
  }

  try {
    const idToken = await user.getIdToken();
    const baseUrl = Constants.expoConfig?.extra?.apiUrl;
    const response = await fetch(`${baseUrl}/api/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const text = await response.text();
    console.log("Token id:", idToken);
    console.log("Respuesta del backend:", text);
  } catch (err) {
    console.error("Error al conectar con el backend:", err);
  }
};