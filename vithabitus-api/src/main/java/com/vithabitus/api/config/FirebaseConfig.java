package com.vithabitus.api.config;

import java.io.InputStream;

import org.springframework.stereotype.Component;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Component
public class FirebaseConfig {
	@PostConstruct
	public void init() {
		try {
			InputStream serviceAcc = getClass().getResourceAsStream("/firebaseAdminSdk.json");
			
			FirebaseOptions opt = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(serviceAcc)).build();
			
			if(FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(opt);
				System.out.println("Firebase inicializado correctamente");
			}
		}catch(Exception e) {
			throw new RuntimeException("Error inicializando Firebase", e);
		}
	}
	
}
