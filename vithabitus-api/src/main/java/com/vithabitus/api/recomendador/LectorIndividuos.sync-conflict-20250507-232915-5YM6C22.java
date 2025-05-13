package com.vithabitus.api.recomendador;
import java.util.List;
import java.util.Arrays;

public class LectorIndividuos{
    public static Individuo leer(String line) throws Exception {
        double[] cromosoma = new double[53];
        int i = 0;
        //Reading until we run out of lines

        List<String> lineData = Arrays.asList(line.split(";"));
        for (String s : lineData)
            cromosoma[i++] = Double.valueOf(s);

        return new Individuo(cromosoma, true);
    }
}