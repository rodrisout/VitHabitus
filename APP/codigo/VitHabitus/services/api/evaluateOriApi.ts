import {getAuthHeaderApi } from "./apiHeaderConfig";
import { getApiUrl } from "./initApiUrl";

export const evaluateOriApi = async () => {

    const headers = await getAuthHeaderApi();
    const response = await fetch(`${getApiUrl()}/api/ori`, {
        method: "GET",
        headers,
    });

    if (!response.ok) {
        throw new Error("Error al obtener Ori");
    }

    return await response.json();
}