import { getAuthHeaderApi } from "./apiHeaderConfig";
import { getApiUrl } from "./initApiUrl";


 export const getRecomender = async () => {

    const headers = await getAuthHeaderApi();

    const response = await fetch(`${getApiUrl()}/api/recommender`, {
        method: "GET",
        headers,
    });

    if(!response.ok) {
        const errorText = await response.text();
        console.error("Error en la API:", errorText);
        throw new Error("Error al obtener recomendaciones");
    }

    return await response.json();
 }