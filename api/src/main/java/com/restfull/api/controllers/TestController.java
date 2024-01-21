package com.restfull.api.controllers;

import com.restfull.api.services.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private JwtService jwtService;

    @GetMapping("/ok")
    public ResponseEntity<String> ok() {
        return ResponseEntity.ok("Test ok!");
    }

    @GetMapping("/error")
    public ResponseEntity<String> error() {
        throw new RuntimeException("Test error!");
    }

    @GetMapping("/token/gen")
    public ResponseEntity<String> genToken() {
        return ResponseEntity.ok(jwtService.generateToken("test@mail.com"));
    }

    @PostMapping("/token/claims")
    public ResponseEntity<Claims> claims(@RequestBody String token) {
        return ResponseEntity.ok(jwtService.getClaims(token));
    }

}