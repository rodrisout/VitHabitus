package com.vithabitus.api.recomendador;

public class IndividuoOriginal{
    public IndividuoOriginal(){
        sexo = 0;
        edad = 0;
        poblacion = 0;
        estudios = 0;
        estEconomico = 0;
        profesion = 0;
        estres = 0;
        horDormir = 0;
        alcoholDestilado = 0;
        copasAlcoholDestilado = 0;
        alcoholFermentado = 0;
        copasAlcoholFermentado = 0;
        copasVinoTinto = 0;
        copasVinoBlanco = 0;
        copasVinoRosado = 0;
        fumador = 0;
        fumadorConsumo = 0;
        pipa = 0;
        puros = 0;
        exfumadorA = 0;
        exfumadorNOSABE = 0;
        cancer = 0;
        cancerMama = 0;
        cancerColon = 0;
        cancerProstata = 0;
        cancerPulmon = 0;
        cancerOtro = 0;
        infartoMiocardio = 0;
        anginaPecho = 0;
        insuficienciaCardiaca = 0;
        diabetesT2 = 0;
        sindMetabolico = 0;
        apnea = 0;
        asma = 0;
        EPOC = 0;
        consumoAceiteOliva = 0;
        consumoVerdura = 0.0;
        consumoFruta = 0;
        consumoCarne = 0;
        consumoMantequilla = 0;
        consumoRefrescos = 0;
        consumoLegumbres = 0;
        consumoPescado = 0;
        consumoReposteria = 0;
        consumoFSecos = 0;
        consumoPollo = 0;
        consumoSofrito = 0;
        consumoLacteo = 0;
        consumoDesnatado = 0;
        ejercicioIntensoMinutosSemana = 0;
        ejercicioModeradoMinutosSemana = 0;
        ejercicioCaminadoMinutosSemana = 0;
        sentadoMinutos = 0;
    }

    private Integer sexo;
    private Integer edad;
    private Integer poblacion;
    private Integer estudios;
    private Integer estEconomico;
    private Integer profesion;
    private Integer estres;
    private Integer horDormir;
    private Integer alcoholDestilado;
    private Integer copasAlcoholDestilado;
    private Integer alcoholFermentado;
    private Integer copasAlcoholFermentado;
    private Integer copasVinoTinto;
    private Integer copasVinoBlanco;
    private Integer copasVinoRosado;
    private Integer fumador;
    private Integer fumadorConsumo;
    private Integer pipa;
    private Integer puros;
    private Integer exfumadorA;
    private Integer exfumadorNOSABE;
    private Integer cancer;
    private Integer cancerMama;
    private Integer cancerColon;
    private Integer cancerProstata;
    private Integer cancerPulmon;
    private Integer cancerOtro;
    private Integer infartoMiocardio;
    private Integer anginaPecho;
    private Integer insuficienciaCardiaca;
    private Integer diabetesT2;
    private Integer sindMetabolico;
    private Integer apnea;
    private Integer asma;
    private Integer EPOC;
    private Integer consumoAceiteOliva;
    private Double consumoVerdura;
    private Integer consumoFruta;
    private Integer consumoCarne;
    private Integer consumoMantequilla;
    private Integer consumoRefrescos;
    private Integer consumoLegumbres;
    private Integer consumoPescado;
    private Integer consumoReposteria;
    private Integer consumoFSecos;
    private Integer consumoPollo;
    private Integer consumoSofrito;
    private Integer consumoLacteo;
    private Integer consumoDesnatado;
    private Integer ejercicioIntensoMinutosSemana;
    private Integer ejercicioModeradoMinutosSemana;
    private Integer ejercicioCaminadoMinutosSemana;
    private Integer sentadoMinutos;

    public Individuo generaOg(){
        double[] d = new double[53];
        d[0] = (double) sexo;
        d[1] = (double) edad;
        d[2] = (double) poblacion;
        d[3] = (double) estudios;
        d[4] = (double) estEconomico;
        d[5] = (double) profesion;
        d[6] = (double) estres;
        d[7] = (double) horDormir;
        d[8] = (double) alcoholDestilado;
        d[9] = (double) copasAlcoholDestilado;
        d[10] = (double) alcoholFermentado;
        d[11] = (double) copasAlcoholFermentado;
        d[12] = (double) copasVinoTinto;
        d[13] = (double) copasVinoBlanco;
        d[14] = (double) copasVinoRosado;
        d[15] = (double) fumador;
        d[16] = (double) fumadorConsumo;
        d[17] = (double) pipa;
        d[18] = (double) puros;
        d[19] = (double) exfumadorA;
        d[20] = (double) exfumadorNOSABE;
        d[21] = (double) cancer;
        d[22] = (double) cancerMama;
        d[23] = (double) cancerColon;
        d[24] = (double) cancerProstata;
        d[25] = (double) cancerPulmon;
        d[26] = (double) cancerOtro;
        d[27] = (double) infartoMiocardio;
        d[28] = (double) anginaPecho;
        d[29] = (double) insuficienciaCardiaca;
        d[30] = (double) diabetesT2;
        d[31] = (double) sindMetabolico;
        d[32] = (double) apnea;
        d[33] = (double) asma;
        d[34] = (double) EPOC;
        d[35] = (double) consumoAceiteOliva;
        d[36] = consumoVerdura;
        d[37] = (double) consumoFruta;
        d[38] = (double) consumoCarne;
        d[39] = (double) consumoMantequilla;
        d[40] = (double) consumoRefrescos;
        d[41] = (double) consumoLegumbres;
        d[42] = (double) consumoPescado;
        d[43] = (double) consumoReposteria;
        d[44] = (double) consumoFSecos;
        d[45] = (double) consumoPollo;
        d[46] = (double) consumoSofrito;
        d[47] = (double) consumoLacteo;
        d[48] = (double) consumoDesnatado;
        d[49] = (double) ejercicioIntensoMinutosSemana;
        d[50] = (double) ejercicioModeradoMinutosSemana;
        d[51] = (double) ejercicioCaminadoMinutosSemana;
        d[52] = (double) sentadoMinutos;
        return new Individuo(d, true);
    }
    public void setSexo(Integer value){
        this.sexo = value;
    }
    public void setEdad(Integer value){
        this.edad = value;
    }
    public void setPoblacion(Integer value){
        this.poblacion = value;
    }
    public void setEstudios(Integer value){
        this.estudios = value;
    }
    public void setEstEconomico(Integer value){
        this.estEconomico = value;
    }
    public void setProfesion(Integer value){
        this.profesion = value;
    }
    public void setEstres(Integer value){
        this.estres = value;
    }
    public void setHorDormir(Integer value){
        this.horDormir = value;
    }
    public void setAlcoholDestilado(Integer value){
        this.alcoholDestilado = value;
    }
    public void setCopasAlcoholDestilado(Integer value){
        this.copasAlcoholDestilado = value;
    }
    public void setAlcoholFermentado(Integer value){
        this.alcoholFermentado = value;
    }
    public void setCopasAlcoholFermentado(Integer value){
        this.copasAlcoholFermentado = value;
    }
    public void setCopasVinoTinto(Integer value){
        this.copasVinoTinto = value;
    }
    public void setCopasVinoBlanco(Integer value){
        this.copasVinoBlanco = value;
    }
    public void setCopasVinoRosado(Integer value){
        this.copasVinoRosado = value;
    }
    public void setFumador(Integer value){
        this.fumador = value;
    }
    public void setFumadorConsumo(Integer value){
        this.fumadorConsumo = value;
    }
    public void setPipa(Integer value){
        this.pipa = value;
    }
    public void setPuros(Integer value){
        this.puros = value;
    }
    public void setExfumadorA(Integer value){
        this.exfumadorA = value;
    }
    public void setExfumadorNOSABE(Integer value){
        this.exfumadorNOSABE = value;
    }
    public void setCancer(Integer value){
        this.cancer = value;
    }
    public void setCancerMama(Integer value){
        this.cancerMama = value;
    }
    public void setCancerColon(Integer value){
        this.cancerColon = value;
    }
    public void setCancerProstata(Integer value){
        this.cancerProstata = value;
    }
    public void setCancerPulmon(Integer value){
        this.cancerPulmon = value;
    }
    public void setCancerOtro(Integer value){
        this.cancerOtro = value;
    }
    public void setInfartoMiocardio(Integer value){
        this.infartoMiocardio = value;
    }
    public void setAnginaPecho(Integer value){
        this.anginaPecho = value;
    }
    public void setInsuficienciaCardiaca(Integer value){
        this.insuficienciaCardiaca = value;
    }
    public void setDiabetesT2(Integer value){
        this.diabetesT2 = value;
    }
    public void setSindMetabolico(Integer value){
        this.sindMetabolico = value;
    }
    public void setApnea(Integer value){
        this.apnea = value;
    }
    public void setAsma(Integer value){
        this.asma = value;
    }
    public void setEPOC(Integer value){
        this.EPOC = value;
    }
    public void setConsumoAceiteOliva(Integer value){
        this.consumoAceiteOliva = value;
    }
    public void setConsumoVerdura(Double value){
        this.consumoVerdura = value;
    }
    public void setConsumoFruta(Integer value){
        this.consumoFruta = value;
    }
    public void setConsumoCarne(Integer value){
        this.consumoCarne = value;
    }
    public void setConsumoMantequilla(Integer value){
        this.consumoMantequilla = value;
    }
    public void setConsumoRefrescos(Integer value){
        this.consumoRefrescos = value;
    }
    public void setConsumoLegumbres(Integer value){
        this.consumoLegumbres = value;
    }
    public void setConsumoPescado(Integer value){
        this.consumoPescado = value;
    }
    public void setConsumoReposteria(Integer value){
        this.consumoReposteria = value;
    }
    public void setConsumoFSecos(Integer value){
        this.consumoFSecos = value;
    }
    public void setConsumoPollo(Integer value){
        this.consumoPollo = value;
    }
    public void setConsumoSofrito(Integer value){
        this.consumoSofrito = value;
    }
    public void setConsumoLacteo(Integer value){
        this.consumoLacteo = value;
    }
    public void setConsumoDesnatado(Integer value){
        this.consumoDesnatado = value;
    }
    public void setEjercicioIntensoMinutosSemana(Integer value){
        this.ejercicioIntensoMinutosSemana = value;
    }
    public void setEjercicioModeradoMinutosSemana(Integer value){
        this.ejercicioModeradoMinutosSemana = value;
    }
    public void setEjercicioCaminadoMinutosSemana(Integer value){
        this.ejercicioCaminadoMinutosSemana = value;
    }
    public void setSentadoMinutos(Integer value){
        this.sentadoMinutos = value;
    }
    public Integer getSexo(){return sexo;}
    public Integer getEdad(){return edad;}
    public Integer getPoblacion(){return poblacion;}
    public Integer getEstudios(){return estudios;}
    public Integer getEstEconomico(){return estEconomico;}
    public Integer getProfesion(){return profesion;}
    public Integer getEstres(){return estres;}
    public Integer getHorDormir(){return horDormir;}
    public Integer getAlcoholDestilado(){return alcoholDestilado;}
    public Integer getCopasAlcoholDestilado(){return copasAlcoholDestilado;}
    public Integer getAlcoholFermentado(){return alcoholFermentado;}
    public Integer getCopasAlcoholFermentado(){return copasAlcoholFermentado;}
    public Integer getCopasVinoTinto(){return copasVinoTinto;}
    public Integer getCopasVinoBlanco(){return copasVinoBlanco;}
    public Integer getCopasVinoRosado(){return copasVinoRosado;}
    public Integer getFumador(){return fumador;}
    public Integer getFumadorConsumo(){return fumadorConsumo;}
    public Integer getPipa(){return pipa;}
    public Integer getPuros(){return puros;}
    public Integer getExfumadorA(){return exfumadorA;}
    public Integer getExfumadorNOSABE(){return exfumadorNOSABE;}
    public Integer getCancer(){return cancer;}
    public Integer getCancerMama(){return cancerMama;}
    public Integer getCancerColon(){return cancerColon;}
    public Integer getCancerProstata(){return cancerProstata;}
    public Integer getCancerPulmon(){return cancerPulmon;}
    public Integer getCancerOtro(){return cancerOtro;}
    public Integer getInfartoMiocardio(){return infartoMiocardio;}
    public Integer getAnginaPecho(){return anginaPecho;}
    public Integer getInsuficienciaCardiaca(){return insuficienciaCardiaca;}
    public Integer getDiabetesT2(){return diabetesT2;}
    public Integer getSindMetabolico(){return sindMetabolico;}
    public Integer getApnea(){return apnea;}
    public Integer getAsma(){return asma;}
    public Integer getEPOC(){return EPOC;}
    public Integer getConsumoAceiteOliva(){return consumoAceiteOliva;}
    public Double getConsumoVerdura(){return consumoVerdura;}
    public Integer getConsumoFruta(){return consumoFruta;}
    public Integer getConsumoCarne(){return consumoCarne;}
    public Integer getConsumoMantequilla(){return consumoMantequilla;}
    public Integer getConsumoRefrescos(){return consumoRefrescos;}
    public Integer getConsumoLegumbres(){return consumoLegumbres;}
    public Integer getConsumoPescado(){return consumoPescado;}
    public Integer getConsumoReposteria(){return consumoReposteria;}
    public Integer getConsumoFSecos(){return consumoFSecos;}
    public Integer getConsumoPollo(){return consumoPollo;}
    public Integer getConsumoSofrito(){return consumoSofrito;}
    public Integer getConsumoLacteo(){return consumoLacteo;}
    public Integer getConsumoDesnatado(){return consumoDesnatado;}
    public Integer getEjercicioIntensoMinutosSemana(){return ejercicioIntensoMinutosSemana;}
    public Integer getEjercicioModeradoMinutosSemana(){return ejercicioModeradoMinutosSemana;}
    public Integer getEjercicioCaminadoMinutosSemana(){return ejercicioCaminadoMinutosSemana;}
    public Integer getSentadoMinutos(){return sentadoMinutos;}
}
