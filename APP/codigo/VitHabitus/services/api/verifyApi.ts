import {auth} from "../firebaseConfig";  
import { getApiUrl, loadApiUrl } from "./initApiUrl";

export const verifyWithApi = async () => {

  const user = auth.currentUser;

  if (!user) {
    console.warn("No hay usuario logueado");
    return;
  }

  try {
    const idToken = await user.getIdToken();
    await loadApiUrl();
    const response = await fetch(`${getApiUrl()}/api/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    const text = await response.text();
    //console.log("Token id:", idToken);
    console.log("Respuesta del backend:", text);
  } catch (err) {
    console.error("Error al conectar con el backend:", err);
  }
};