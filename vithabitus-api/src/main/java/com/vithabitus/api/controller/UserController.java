package com.vithabitus.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.database.utilities.Pair;
import com.vithabitus.api.config.FirebaseService;
import com.vithabitus.api.recomendador.AnalizadorHabitos;
import com.vithabitus.api.recomendador.Individuo;
import com.vithabitus.api.recomendador.RecomendacionesTexto;
import com.vithabitus.api.recomendador.RecomendadorHabitos;


@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private FirebaseService firebaseService;
	
	@GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
		
        try {

            String uid =getUidFromToken(authHeader);
            
            return ResponseEntity.ok("Token válido. UID: " + uid);
        
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token inválido: " + e.getMessage());
        }
    }
	@GetMapping("/ori")
	public ResponseEntity<?> getOri(@RequestHeader("Authorization") String authHeader) {
		
		try {
			String uid =getUidFromToken(authHeader);
			Map<String, Object> datos = firebaseService.getHabits(uid);
			datos.remove("timestamp");
			
            Individuo ind = new AnalizadorHabitos().analizar(datos);
            
            firebaseService.guardarORI(uid, (100-ind.getFitness()));
            System.out.println("Fitness_getORI: " + (100-ind.getFitness()));
            System.out.println("Datos leídos: " + datos);

            return ResponseEntity.ok(Map.of("ORI", (100- ind.getFitness())));
			
		}catch(Exception e){
			return ResponseEntity.status(500).body("Error al calcular el ORI: " + e.getMessage());	
		}
		
	}
	
	@GetMapping("/recommender")
	public ResponseEntity<?> recomendar(@RequestHeader("Authorization") String authHeader){
		
		try {

			String uid =getUidFromToken(authHeader);
			Map<String, Object> datos = firebaseService.getHabits(uid);
			datos.remove("timestamp");
			
			Pair<Individuo, Individuo> sol= new RecomendadorHabitos().recomendar(datos);
			
			List<String> recomendaciones = RecomendacionesTexto.generarTexto(sol.getSecond());
			
			firebaseService.guardarORI(uid, (100-sol.getFirst().getFitness()));
			firebaseService.guardarRecomendaciones(uid, sol.getSecond(), recomendaciones);
			
			return ResponseEntity.ok(Map.of(
		            "ori_inicial", (100-sol.getFirst().getFitness()),
		            "ori_objetivo", (100-sol.getSecond().getFitness())
		        ));
		}catch(Exception e) {
			return ResponseEntity.status(500).body("Error al ejecutar el recomendador: " + e.getMessage());
		}
	}
	
	
	//FUNCIONES AUXILIARES -----------------------------------------------
	
	private String getUidFromToken(String authHeader) throws Exception {
        String token = authHeader.replace("Bearer", "").trim();
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        return decodedToken.getUid();
    }
}
