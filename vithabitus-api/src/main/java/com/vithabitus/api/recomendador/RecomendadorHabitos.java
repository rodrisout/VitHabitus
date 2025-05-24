package 
com.vithabitus.api.recomendador;


import java.util.Map;

import com.google.firebase.database.utilities.Pair;



public class RecomendadorHabitos {

	public Pair<Individuo, Individuo> recomendar(Map<String, Object> datos) {
		
		Individuo org = new AnalizadorHabitos().analizar(datos);
		
		Controller cont = new Controller();
		
		cont.setOriginal(org);
		cont.run();
		
		Individuo solucion = cont.getAg().getMejorIndividuo().getFitness() > org.getFitness() ? cont.getAg().getMejorIndividuo() : org;
		
		return new Pair<>(org, solucion);
	}
}
