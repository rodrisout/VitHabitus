import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { get } from "lodash";



const db =getFirestore();
const auth = getAuth();

export const leercampoBD = async(path: string) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("No user is currently signed in.");
    }   
    const partes = path.split("/");
    const uid = user.uid;

    if(partes.length <2){
        throw new Error("Invalid path");
    }   

    const [col1, doc1, ...resto] = partes;

    const docRef = doc(db, 'usuarios', uid, col1, doc1);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
        throw new Error("Document does not exist");
    }
    
    const data: any= snapshot.data();

    if(resto.length ==0)
        return data;

    let resultado = data;
    for (const campo of resto) {
        if(resultado && campo in resultado){
            resultado = resultado[campo];
        }else{  
            throw new Error("Field does not exist");
        }
    }
    return resultado as number;
}