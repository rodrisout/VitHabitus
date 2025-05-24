package com.vithabitus.api.config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.vithabitus.api.recomendador.Individuo;

@Service
public class FirebaseService {
	
	public Map<String, Object> getHabits(String uid) throws Exception {
		
        Firestore db = FirestoreClient.getFirestore();
        DocumentSnapshot doc = db.collection("usuarios").document(uid).collection("habitos").document("formulario").get().get();
        if (!doc.exists()) {
            throw new Exception("No se encontraron hábitos para el usuario " + uid);
        }
        return doc.getData();
    }
	
	public void guardarORI(String uid, int ori) throws Exception {
	    Firestore db = FirestoreClient.getFirestore();
	    Map<String, Object> data = new HashMap<>();
	    
	    data.put("ORI", ori);
	    data.put("timestamp", System.currentTimeMillis());
	    
	    System.out.println("Fitness_DB_guardado: " + ori);
	    db.collection("usuarios").document(uid).collection("habitos")
	      .document("valor")
	      .set(data)
	      .get(); 
	}
	
	public void guardarRecomendaciones(String uid, Individuo ind,  List<String> recomendaciones) throws Exception{
		
		Firestore db = FirestoreClient.getFirestore();
		
	
	    Map<String, Object> data = new HashMap<>();
	    data.put("ORI", 100-ind.getFitness());
	    data.put("timestamp", System.currentTimeMillis());

	    double[] cromosoma = ind.getCromosoma();
	    double[] original = ind.getOriginal();
	    String[] nombres = ind.getNombres();
	    
	    for(int i = 0; i< nombres.length; i++) {
	    	if(Double.compare(original[i], cromosoma[i]) !=0) {
	    		Map<String, Object> campo = new HashMap<>();
	    		campo.put("original", original[i]);
	    		campo.put("objetivo", cromosoma[i]);
				data.put(nombres[i], campo);		
	    	}
	    }
	    
	    db.collection("usuarios").document(uid).collection("habitos")
	      .document("recomendacion")
	      .set(data)
	      .get();
		    
		    
	}
}
