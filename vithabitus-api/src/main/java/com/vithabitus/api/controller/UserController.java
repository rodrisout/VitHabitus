package com.vithabitus.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;


@RestController
@RequestMapping("/api")
public class UserController {
	
	@GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
		
        try {
        
        	String token = authHeader.replace("Bearer ", "").trim();
        	
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
            String uid = decodedToken.getUid();
            
            return ResponseEntity.ok("Token válido. UID: " + uid);
        
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token inválido: " + e.getMessage());
        }
    }
}
