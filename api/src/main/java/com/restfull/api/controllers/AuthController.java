package com.restfull.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restfull.api.dtos.auth.AuthRequestDTO;
import com.restfull.api.dtos.auth.AuthResponseDTO;
import com.restfull.api.dtos.auth.GoogleRequestDTO;
import com.restfull.api.dtos.auth.RegisterRequestDTO;
import com.restfull.api.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponseDTO> authenticate(@RequestBody AuthRequestDTO dto) {
        return ResponseEntity.ok(authService.authenticate(dto));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponseDTO> authenticateGoogle(@RequestBody GoogleRequestDTO dto) {
        return ResponseEntity.ok(authService.authenticateGoogle(dto));
    }


}
