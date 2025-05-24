package com.vithabitus.api.recomendador;

import org.apache.commons.jexl3.JexlBuilder;
import org.apache.commons.jexl3.JexlEngine;
import org.apache.commons.jexl3.JexlExpression;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Individuo implements Comparable<Individuo>{
    private int[] recorrerCrom = {0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1};

    public static String[] nombres = {"sexo","edad","poblacion","estudios","estEconomico","profesion","estres","horDormir","alcoholDestilado","copasAlcoholDestilado","alcoholFermentado","copasAlcoholFermentado","copasVinoTinto","copasVinoBlanco","copasVinoRosado","fumador","fumadorConsumo","pipa","puros","exfumadorA","exfumadorNOSABE","cancer","cancerMama","cancerColon","cancerProstata","cancerPulmon","cancerOtro","infartoMiocardio","anginaPecho","insuficienciaCardiaca","diabetesT2","sindMetabolico","apnea","asma","EPOC","consumoAceiteOliva","consumoVerdura","consumoFruta","consumoCarne","consumoMantequilla","consumoRefrescos","consumoLegumbres","consumoPescado","consumoReposteria","consumoFSecos","consumoPollo","consumoSofrito","consumoLacteo","consumoDesnatado","ejercicioIntensoMinutosSemana","ejercicioModeradoMinutosSemana","ejercicioCaminadoMinutosSemana","sentadoMinutos"};


    private final int SLEEP8 = 7, SPIRIT = 8, SPIRIT_W = 9, WINE_BEER = 10, BEER_W = 11, WINE_W = 12, WHITE_W = 13, PINK_W = 14, SMOKE = 15, NUM_SMOKE = 16, PIPE = 17, CIGAR = 18,
            CAO = 35, CVerd = 36, CFruta = 37, CCarneR = 38, CManteq = 39, CRefresco = 40, CLegum = 41, CPesc = 42, CRepos = 43, CFSeco = 44, CCarneB = 45, CSofrito = 46, CLacteo = 47, CDesnat = 48,
            EIMS = 49, EMMS= 50, ECMS = 51, SentadoMin = 52;

    private double[] cromosoma;
    private double[] original;
    private int fitness;
    private boolean isFitnessValid = false;

    public Individuo(double[] og, boolean first){
        cromosoma = new double[53];
        original = og;
        if(first){
            cromosoma = og;
        }
        else{
            for (int i = 0; i < recorrerCrom.length; i++){
                if(recorrerCrom[i] == 0){
                    cromosoma[i] = og[i];
                }
                else{
                    cromosoma[i] = getLimitedRandom(i);
                }
            }
        }
        calculaFitness();
    }

    public Individuo(Individuo ind){
        original = ind.getOriginal();
        cromosoma = new double[original.length];
        for(int i = 0; i < cromosoma.length; i++){
            cromosoma[i] = ind.getCromosoma()[i];
        }
        this.fitness = ind.getFitness();
    }

    public double getLimitedRandom(int i){
        double ret = 0.0;
        int valor = (int) original[i];

        switch(i){
            case SLEEP8,CCarneB: //Estos campos sólo pueden valer 0 o 1

                ret = new Random().nextInt(2);
                break;
            case CDesnat:  //Si el original es 1 (Si), se queda en 1, si no, puede valer 1 o 2
                if(original[i] == 1.0)
                    ret = 1.0;
                else
                    ret = new Random().nextInt(2);
                break;
            case SPIRIT, WINE_BEER, SMOKE: //Estos campos sólo pueden valer 0 o 1 y no pueden ser mayor que el original
                if(original[i] == 0.0)
                    ret = 0.0;
                else
                    ret = new Random().nextInt(2);
                break;
            case SPIRIT_W, NUM_SMOKE, PIPE, CIGAR, BEER_W, WINE_W, WHITE_W, PINK_W:  //Estos campos no pueden ser mayor que el original
                if(original[i] == 0.0)
                    ret = 0.0;
                else
                    ret = (new Random().nextInt(valor + 1));
                break;
            case CManteq, CRefresco, CRepos, SentadoMin:
                ret = (new Random().nextInt(valor + 1));
                break;
            case CAO, CVerd, CFruta, CCarneR,  CLacteo, CLegum, CSofrito, CPesc, CFSeco:   //Estos valores tendrán un rango de 2 por encima y 2 por debajo del original
                do{
                    ret = (new Random().nextInt((valor + 2)- (valor -2) + 1) + (valor -2));
                }while(ret < 0);
                break;
            case EIMS, EMMS, ECMS:                                   //Estos valores tendrán un rango de +-30/+-120/+-270 entorno al original
                int aux = i - EIMS + 1;
                aux *= aux;
                do {
                    ret = (new Random().nextInt(60*aux+1) + (valor-30*aux));
                }while(ret < 0);
                break;
        }
        return ret;
    }
    public int getFitness(){
        if(isFitnessValid)
            return fitness;
        calculaFitness();
        return fitness;
    }
    public double[] getCromosoma(){
        return cromosoma;
    }

    public int[] getRecorrerCrom(){
        return recorrerCrom;
    }
    public double[] getOriginal(){
        return original;
    }

    private void calculaFitness(){
        int temp = 0;
        JexlEngine jexl = new JexlBuilder().create();
        
        if (ModelosServ.modelos == null || ModelosServ.modelos.isEmpty()) {
            throw new IllegalStateException("Los modelos no están cargados. ¿Se ejecutó @PostConstruct?");
        }
        for(int i = 0; i < ModelosServ.modelos.size(); i++){
            String exp = replaceGetVariable(ModelosServ.modelos.get(i));
            JexlExpression expression = jexl.createExpression(exp);
            Object result = expression.evaluate(null);
            temp += (int) result;
        }
        fitness = temp;
        isFitnessValid = true;
    }
    private String replaceGetVariable(String expression) {
        // Definir la expresión regular para buscar getVariable(x,k)
        String regex = "getVariable\\((\\d+),k\\)";

        // Compilar la expresión regular
        Pattern pattern = Pattern.compile(regex);

        // Crear un objeto Matcher para la expresión
        Matcher matcher = pattern.matcher(expression);

        // Iterar sobre las coincidencias y reemplazarlas por los valores correspondientes
        StringBuffer buffer = new StringBuffer();
        while (matcher.find()) {
            int index = Integer.parseInt(matcher.group(1)) - 1;
            if (index >= 0 && index < cromosoma.length) {
                double value = cromosoma[index];
                matcher.appendReplacement(buffer, Double.toString(value));
            }
        }
        matcher.appendTail(buffer);

        return buffer.toString();
    }

    public void validateFitness(boolean b){ isFitnessValid = b;}
    @Override
    public int compareTo(Individuo o) { //Maximizamos el fitness

        if(getFitness() == o.getFitness())
            return 0;
        return (getFitness() < o.getFitness()) ? 1 : -1;
    }
    public String toString(){
        String ret = " ";
        for(int i = 0; i < cromosoma.length; i++){
//            if(recorrerCrom[i] == 1 && (original[i] - cromosoma[i] != 0.0))
//                ret += nombres[i] + " " + cromosoma[i] + "(" + (cromosoma[i] - original[i]) + ")" + ";";
//            else nombres[i] + " " +
            ret +=  cromosoma[i] + ";";
        }
        return fitness +";"+ ret;
    }

    public String[] getNombres(){
        return nombres;
    }
}