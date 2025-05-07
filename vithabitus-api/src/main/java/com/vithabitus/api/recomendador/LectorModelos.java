package com.vithabitus.api.recomendador;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LectorModelos {

    public static final int N_MODELOS = 100;

    public static List<String> leer() throws Exception {
        List<String> modelos = new ArrayList<String>();
        int i = 0;
        
        InputStream is = LectorModelos.class.getResourceAsStream("/data/modelosDemo.csv");
        
        if (is == null) {
            throw new RuntimeException("❌ No se encontró el archivo modelosDemo.csv en /resources/data/");
        }
       
        InputStreamReader  fr = new InputStreamReader(is);
        
        try (BufferedReader br = new BufferedReader(fr)) {
			//br.readLine(); //Saltamos la primera línea que es el nombre de las columnas
			String line;
			for(; i < N_MODELOS && (line = br.readLine()) != null; i++){
			    List<String> lineData = Arrays.asList(line.split(";"));
			    modelos.add(convertIfToTernary(lineData.get(2)));
			}
		}
        

        //if(i != N_MODELOS)
          //  throw new IncorrectNumberOfParametersException(" (Faltan " + Integer.toString(N_MODELOS - i) + " modelos)");

        return modelos;
    }

    public static String convertIfToTernary(String ifStatement) {
        String ternaryExpression = ifStatement.replace("if", "")
                .replace("else", "").replaceAll("result=", "").replaceAll("\\{", "")
                .replaceAll("\\}", "");

        ternaryExpression =ternaryExpression.substring(0, ternaryExpression.length() - 4) + " ? 0 : 1";

        return ternaryExpression;
    }
}
