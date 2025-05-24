package com.vithabitus.api.recomendador;

public class Controller{
    private AlgoritmoGenetico ag;
    private int maxGen;
    private int currGen;

    public Controller(){
    }

    public void run(){
        maxGen = ag.getMaxGen();

        ag.initPob();
        ag.evalPob();

        for(currGen = 0; currGen < maxGen; currGen++){
            ag.generarElite();
            ag.selectPob();
            ag.crucePob();
            ag.mutarPob();
            ag.evalPob();
            ag.introducirElite();
        }
    }

    public AlgoritmoGenetico getAg() {
        return ag;
    }

    public void setOriginal(Individuo og){
        ag = new AlgoritmoGenetico(og);
        maxGen = ag.getMaxGen();
    }

    public int getMaxGen(){
        return maxGen;
    }

    public int getCurrGen(){
        return currGen;
    }
}