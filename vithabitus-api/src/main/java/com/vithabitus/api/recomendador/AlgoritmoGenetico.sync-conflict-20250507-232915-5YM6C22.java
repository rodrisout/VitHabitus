package com.vithabitus.api.recomendador;

import java.util.ArrayList;
import java.util.Collections;
public class AlgoritmoGenetico{
    private int tamPoblacion;
    private ArrayList<Individuo> poblacion;
    private int maxGeneraciones;
    private double probCruce;
    private double probMutacion;
    private int tamTorneo;
    private Individuo elMejor;
    private double elitismo;
    private int numElite = 0;
    private Individuo elite[];
    private Individuo original;

    public AlgoritmoGenetico(Individuo og){
        this.tamPoblacion = 100;
        this.maxGeneraciones = 100;
        this.probCruce = 0.8;
        this.probMutacion = 0.05;
        this.elitismo = 0.02;
        this.tamTorneo = 3;
        original = og;
    }

    public void evalPob(){
        for(Individuo i : poblacion)
            i.getFitness();
        Collections.sort(poblacion);
        elMejor = poblacion.get(0);
    }
    public void initPob(){
        poblacion = new ArrayList<Individuo>();
        for(int i = 0; i < tamPoblacion; i++) {
            poblacion.add(new Individuo(original.getCromosoma(), false));
        }
    }

    public void selectPob(){ //Selección por torneo determinista
        ArrayList<Individuo> ret = new ArrayList<Individuo>(tamPoblacion);

        for(int i = 0; i < tamPoblacion; i++){
            ArrayList<Individuo> aux = new ArrayList<Individuo>(tamTorneo);
            for(int j = 0; j < tamTorneo; j++){
                aux.add(poblacion.get((int) (Math.random() * tamPoblacion)));
            }
            Collections.sort(aux);
            ret.add(new Individuo(aux.get(0)));
        }
        poblacion = ret;
    }

    public void crucePob(){ //Cruce Uniforme
        ArrayList<Individuo> hijos = new ArrayList<Individuo>(tamPoblacion);
        for(int i = 0; i < tamPoblacion; i+=2){
            Individuo padre1 = poblacion.get(i);
            Individuo padre2 = poblacion.get(i+1);
            Individuo hijo1 = new Individuo(padre1);
            Individuo hijo2 = new Individuo(padre2);
            if(probCruce < (Math.random())){
                for(int k = 0; k < padre1.getCromosoma().length; k++){
                    if(padre1.getRecorrerCrom()[k] == 1){
                        if(Math.random() < 0.5){
                            hijo1.getCromosoma()[k] = padre2.getCromosoma()[k];
                            hijo1.validateFitness(false);
                            hijo2.getCromosoma()[k] = padre1.getCromosoma()[k];
                            hijo2.validateFitness(false);

                        }
                    }
                }
            }

            hijos.add(hijo1);
            hijos.add(hijo2);
        }
        poblacion = hijos;
    }

    public void mutarPob(){ //Mutación Básica
        for(int k = 0; k < tamPoblacion; k++){
            Individuo ind = poblacion.get(k);
            for(int i = 0; i < ind.getCromosoma().length; i++){
                if(ind.getRecorrerCrom()[i] == 1){
                    if(probMutacion > Math.random()){
                        ind.getCromosoma()[i] = ind.getLimitedRandom(i);
                        ind.validateFitness(false);
                    }
                }
            }
        }
    }
    public void generarElite(){
        this.numElite = (int) (elitismo * tamPoblacion);
        elite = new Individuo[numElite];
        Collections.sort(poblacion);
        for(int i = 0; i < numElite; i++){
            elite[i] = new Individuo(poblacion.get(i));
        }
    }

    public void introducirElite() {
        for(int i = 0; i < numElite; i++){
            if(poblacion.get(tamPoblacion - 1 - (numElite - i)).getFitness() < elite[i].getFitness())
                poblacion.set(tamPoblacion - 1 - (numElite - i), elite[i]);
            else
                break;
        }
        Collections.sort(poblacion);
    }

    public Individuo getMejorIndividuo(){
        return elMejor;
    }
    public int getMaxGen(){
        return maxGeneraciones;
    }

    public Individuo getOriginal() { return original;
    }
}