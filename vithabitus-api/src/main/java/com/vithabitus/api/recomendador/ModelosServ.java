package com.vithabitus.api.recomendador;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import java.util.List;



@Component
public class ModelosServ {

	public static List<String> modelos;

    @PostConstruct
    public void init() throws Exception {
        modelos = LectorModelos.leer(); // carga el archivo CSV al arrancar
    }

    public List<String> getModelos() {
        return modelos;
    }
}