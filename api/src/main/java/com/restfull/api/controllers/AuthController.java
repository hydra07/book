package com.restfull.api.controllers;

import com.restfull.api.dtos.AuthRequestDTO;
import com.restfull.api.dtos.AuthResponseDTO;
import com.restfull.api.dtos.RegisterRequestDTO;
import com.restfull.api.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
