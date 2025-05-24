package com.vithabitus.api.recomendador;

import java.util.ArrayList;
import java.util.List;

public class RecomendacionesTexto{
	
	public static List<String> generarTexto(Individuo ind){
		
		List<String> recomendaciones = new ArrayList<>();
		double[] cromosoma = ind.getCromosoma();
		double[] original = ind.getOriginal();
		String[] nombres = ind.getNombres();
		
		for(int i=0; i<cromosoma.length; i++) {
			
			if(Double.compare(original[i], cromosoma[i]) !=0)
				recomendaciones.add(nombres[i] + "pasar de" + original[i] + "a" + cromosoma[i]);		
		}
		
		if(recomendaciones.isEmpty())
			recomendaciones.add("No hay recomendaciones");
		
		return recomendaciones;
	}		
}
