package com.vithabitus.api.recomendador;

import java.util.Map;

public class IndividuoLoad {
	
	//funcion que parsea los datos de Firebase para crear un nuevo individuo
	public IndividuoOriginal IndividuoFromFirebase(Map<String, Object> datos) {
	
		IndividuoOriginal org = new IndividuoOriginal();
		
		if(datos.containsKey("sexo")) org.setSexo(parseInt(datos.get("sexo")));
		if(datos.containsKey("edad")) org.setEdad(parseInt(datos.get("edad")));
		if(datos.containsKey("poblacion")) org.setPoblacion(parseInt(datos.get("poblacion")));
		if(datos.containsKey("estudios")) org.setEstudios(parseInt(datos.get("estudios")));
		if(datos.containsKey("estEconomico")) org.setEstEconomico(parseInt(datos.get("estEconomico")));
		if(datos.containsKey("profesion")) org.setProfesion(parseInt(datos.get("profesion")));
		if(datos.containsKey("estres")) org.setEstres(parseInt(datos.get("estres")));
		if(datos.containsKey("horDormir")) org.setHorDormir(parseInt(datos.get("horDormir")));
		if(datos.containsKey("fumador")) org.setFumador(parseInt(datos.get("fumador")));
		if(datos.containsKey("fumadorConsumo")) org.setFumadorConsumo(parseInt(datos.get("fumadorConsumo")));
		if(datos.containsKey("pipa")) org.setPipa(parseInt(datos.get("pipa")));
		if(datos.containsKey("puros")) org.setPuros(parseInt(datos.get("puros")));
		if(datos.containsKey("exfumadorNOSABE")) org.setExfumadorNOSABE(parseInt(datos.get("exfumadorNOSABE")));
		if(datos.containsKey("exfumadorA")) org.setExfumadorA(parseInt(datos.get("exfumadorA")));
		
		if (datos.containsKey("alcoholDestilado")) org.setAlcoholDestilado(parseInt(datos.get("alcoholDestilado")));
        if (datos.containsKey("copasAlcoholDestilado")) org.setCopasAlcoholDestilado(parseInt(datos.get("copasAlcoholDestilado")));
        if (datos.containsKey("alcoholFermentado")) org.setAlcoholFermentado(parseInt(datos.get("alcoholFermentado")));
        if (datos.containsKey("copasAlcoholFermentado")) org.setCopasAlcoholFermentado(parseInt(datos.get("copasAlcoholFermentado")));
        if (datos.containsKey("copasVinoTinto")) org.setCopasVinoTinto(parseInt(datos.get("copasVinoTinto")));
        if (datos.containsKey("copasVinoBlanco")) org.setCopasVinoBlanco(parseInt(datos.get("copasVinoBlanco")));
        if (datos.containsKey("copasVinoRosado")) org.setCopasVinoRosado(parseInt(datos.get("copasVinoRosado")));
		
        if (datos.containsKey("cancer")) org.setCancer(parseInt(datos.get("cancer")));
        if (datos.containsKey("cancerMama")) org.setCancerMama(parseInt(datos.get("cancerMama")));
        if (datos.containsKey("cancerColon")) org.setCancerColon(parseInt(datos.get("cancerColon")));
        if (datos.containsKey("cancerProstata")) org.setCancerProstata(parseInt(datos.get("cancerProstata")));
        if (datos.containsKey("cancerPulmon")) org.setCancerPulmon(parseInt(datos.get("cancerPulmon")));
        if (datos.containsKey("cancerOtro")) org.setCancerOtro(parseInt(datos.get("cancerOtro")));
        
        if (datos.containsKey("infartoMiocardio")) org.setInfartoMiocardio(parseInt(datos.get("infartoMiocardio")));
        if (datos.containsKey("anginaPecho")) org.setAnginaPecho(parseInt(datos.get("anginaPecho")));
        if (datos.containsKey("insuficienciaCardiaca")) org.setInsuficienciaCardiaca(parseInt(datos.get("insuficienciaCardiaca")));
        if (datos.containsKey("diabetesT2")) org.setDiabetesT2(parseInt(datos.get("diabetesT2")));
        if (datos.containsKey("sindMetabolico")) org.setSindMetabolico(parseInt(datos.get("sindMetabolico")));
        if (datos.containsKey("apnea")) org.setApnea(parseInt(datos.get("apnea")));
        if (datos.containsKey("asma")) org.setAsma(parseInt(datos.get("asma")));
        if (datos.containsKey("EPOC")) org.setEPOC(parseInt(datos.get("EPOC")));
        
        if (datos.containsKey("consumoAceiteOliva")) org.setConsumoAceiteOliva(parseInt(datos.get("consumoAceiteOliva")));
        if (datos.containsKey("consumoVerdura")) org.setConsumoVerdura(parseDouble(datos.get("consumoVerdura")));
        if (datos.containsKey("consumoFruta")) org.setConsumoFruta(parseInt(datos.get("consumoFruta")));
        if (datos.containsKey("consumoCarne")) org.setConsumoCarne(parseInt(datos.get("consumoCarne")));
        if (datos.containsKey("consumoMantequilla")) org.setConsumoMantequilla(parseInt(datos.get("consumoMantequilla")));
        if (datos.containsKey("consumoRefrescos")) org.setConsumoRefrescos(parseInt(datos.get("consumoRefrescos")));
        if (datos.containsKey("consumoLegumbres")) org.setConsumoLegumbres(parseInt(datos.get("consumoLegumbres")));
        if (datos.containsKey("consumoPescado")) org.setConsumoPescado(parseInt(datos.get("consumoPescado")));
        if (datos.containsKey("consumoReposteria")) org.setConsumoReposteria(parseInt(datos.get("consumoReposteria")));
        if (datos.containsKey("consumoFSecos")) org.setConsumoFSecos(parseInt(datos.get("consumoFSecos")));
        if (datos.containsKey("consumoPollo")) org.setConsumoPollo(parseInt(datos.get("consumoPollo")));
        if (datos.containsKey("consumoSofrito")) org.setConsumoSofrito(parseInt(datos.get("consumoSofrito")));
        if (datos.containsKey("consumoLacteo")) org.setConsumoLacteo(parseInt(datos.get("consumoLacteo")));
        if (datos.containsKey("consumoDesnatado")) org.setConsumoDesnatado(parseInt(datos.get("consumoDesnatado")));
		
        if (datos.containsKey("ejercicioIntensoMinutosSemana")) org.setEjercicioIntensoMinutosSemana(parseInt(datos.get("ejercicioIntensoMinutosSemana")));
        if (datos.containsKey("ejercicioModeradoMinutosSemana")) org.setEjercicioModeradoMinutosSemana(parseInt(datos.get("ejercicioModeradoMinutosSemana")));
        if (datos.containsKey("ejercicioCaminadoMinutosSemana")) org.setEjercicioCaminadoMinutosSemana(parseInt(datos.get("ejercicioCaminadoMinutosSemana")));
        if (datos.containsKey("sentadoMinutos")) org.setSentadoMinutos(parseInt(datos.get("sentadoMinutos")));
        
		return org;
	}
	
	
	private int parseInt(Object value) {
	    return value == null ? 0 : Integer.parseInt(value.toString());
	}

	private double parseDouble(Object value) {
	    return value == null ? 0.0 : Double.parseDouble(value.toString());
	}
}
