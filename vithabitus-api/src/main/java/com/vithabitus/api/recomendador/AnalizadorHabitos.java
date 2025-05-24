package com.vithabitus.api.recomendador;

import java.util.Map;

public class AnalizadorHabitos {
	
	public Individuo analizar(Map<String, Object> datos) {

		// nuevo individuo a evaluar
		IndividuoOriginal org = new IndividuoLoad().IndividuoFromFirebase(datos);
		
		return org.generaOg();
	}

}