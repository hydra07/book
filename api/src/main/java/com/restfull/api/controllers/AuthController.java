package com.restfull.api.controllers;

import com.restfull.api.dtos.auth.*;
import com.restfull.api.entities.User;
import com.restfull.api.services.AuthService;
import com.restfull.api.services.EmailService;
import com.restfull.api.services.JwtService;
import com.restfull.api.services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

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
//        try {
//            emailService.sendWelcome(dto.getEmail(), dto.getName());
//        } catch (MessagingException | UnsupportedEncodingException e) {
//            throw new RuntimeException(e);
//        }
        return ResponseEntity.ok(authService.authenticateGoogle(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> login(@RequestBody AuthRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotDto dto){
        try {
            User user = userService.findByEmail(dto.getEmail());
            authService.generateNewPassword(user);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Mật khẩu mới đã được gửi tới email của bạn. Vui lòng kiểm tra email của bạn.");
    }
}
